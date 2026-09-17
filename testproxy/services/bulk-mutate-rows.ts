// Copyright 2022 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as grpc from '@grpc/grpc-js';

import {normalizeCallback, ClientImplMaker, getTableInfo} from './utils';
import {google} from '../protos/protos';
import {PartialFailureError} from '../../src';
type IMutateRowsRequest = google.bigtable.testproxy.IMutateRowsRequest;
type IMutateRowsResult = google.bigtable.testproxy.IMutateRowsResult;

interface ErrorCode {
  code?: number;
}

export const bulkMutateRows: ClientImplMaker<
  IMutateRowsRequest,
  IMutateRowsResult
> = ({clientMap}) =>
  normalizeCallback(async rawRequest => {
    const {request} = rawRequest;
    const {entries, tableName} = request.request!;

    const {clientId} = request;
    const bigtable = clientMap.get(clientId!);
    const table = getTableInfo(bigtable, tableName!);

    try {
      const mutateOptions = {
        rawMutation: true,
      };
      await table.mutate(entries, mutateOptions);
      return {
        status: {code: grpc.status.OK, details: []},
        entries: [],
      };
    } catch (e) {
      const error = e as PartialFailureError & ErrorCode;
      const resultEntries = error.errors
        ? Array.from(error.errors.entries()).map(([index, err]) => ({
            index:
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (err as any).index !== undefined
                ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (err as any).index
                : entries
                  ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    entries.indexOf((err as any).entry)
                  : index + 1,
            status: {
              code: (err as ErrorCode).code,
              message: err.message,
            },
          }))
        : [];
      return {
        status: {
          code: error.code ? error.code : grpc.status.UNKNOWN,
          details: [],
          message: error.message,
        },
        entries: resultEntries,
      };
    }
  });
