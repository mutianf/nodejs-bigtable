// Copyright 2021 Google LLC
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
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

/* global window */
import * as gax from 'google-gax';
import {Callback, CallOptions, Descriptors, ClientOptions} from 'google-gax';

import * as protos from '../../protos/protos';
import jsonProtos = require('../../protos/protos.json');
/**
 * Client JSON configuration object, loaded from
 * `src/v2/bigtable_client_config.json`.
 * This file defines retry strategy and timeouts for all API methods in this library.
 */
import * as gapicConfig from './bigtable_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Service for reading from and writing to existing Bigtable tables.
 * @class
 * @memberof v2
 */
export class BigtableClient {
  private _terminated = false;
  private _opts: ClientOptions;
  private _providedCustomServicePath: boolean;
  private _gaxModule: typeof gax | typeof gax.fallback;
  private _gaxGrpc: gax.GrpcClient | gax.fallback.GrpcClient;
  private _protos: {};
  private _defaults: {[method: string]: gax.CallSettings};
  auth: gax.GoogleAuth;
  descriptors: Descriptors = {
    page: {},
    stream: {},
    longrunning: {},
    batching: {},
  };
  warn: (code: string, message: string, warnType?: string) => void;
  innerApiCalls: {[name: string]: Function};
  pathTemplates: {[name: string]: gax.PathTemplate};
  bigtableStub?: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of BigtableClient.
   *
   * @param {object} [options] - The configuration object.
   * The options accepted by the constructor are described in detail
   * in [this document](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#creating-the-client-instance).
   * The common options are:
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   * @param {gax.ClientConfig} [options.clientConfig] - Client configuration override.
   *     Follows the structure of {@link gapicConfig}.
   * @param {boolean} [options.fallback] - Use HTTP fallback mode.
   *     In fallback mode, a special browser-compatible transport implementation is used
   *     instead of gRPC transport. In browser context (if the `window` object is defined)
   *     the fallback mode is enabled automatically; set `options.fallback` to `false`
   *     if you need to override this behavior.
   */
  constructor(opts?: ClientOptions) {
    // Ensure that options include all the required fields.
    const staticMembers = this.constructor as typeof BigtableClient;
    const servicePath = opts?.servicePath || opts?.apiEndpoint || staticMembers.servicePath;
    this._providedCustomServicePath = !!(opts?.servicePath || opts?.apiEndpoint);
    const port = opts?.port || staticMembers.port;
    const clientConfig = opts?.clientConfig ?? {};
    const fallback = opts?.fallback ?? (typeof window !== 'undefined' && typeof window?.fetch === 'function');
    opts = Object.assign({servicePath, port, clientConfig, fallback}, opts);

    // If scopes are unset in options and we're connecting to a non-default endpoint, set scopes just in case.
    if (servicePath !== staticMembers.servicePath && !('scopes' in opts)) {
      opts['scopes'] = staticMembers.scopes;
    }

    // Choose either gRPC or proto-over-HTTP implementation of google-gax.
    this._gaxModule = opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options sent to the client.
    this._gaxGrpc = new this._gaxModule.GrpcClient(opts);

    // Save options to use in initialize() method.
    this._opts = opts;

    // Save the auth object to the client, for use by other methods.
    this.auth = (this._gaxGrpc.auth as gax.GoogleAuth);

    // Set useJWTAccessWithScope on the auth object.
    this.auth.useJWTAccessWithScope = true;

    // Set defaultServicePath on the auth object.
    this.auth.defaultServicePath = staticMembers.servicePath;

    // Set the default scopes in auth client if needed.
    if (servicePath === staticMembers.servicePath) {
      this.auth.defaultScopes = staticMembers.scopes;
    }

    // Determine the client header string.
    const clientHeader = [
      `gax/${this._gaxModule.version}`,
      `gapic/${version}`,
    ];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${this._gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${this._gaxGrpc.grpcVersion}`);
    } else if (opts.fallback === 'rest' ) {
      clientHeader.push(`rest/${this._gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    this._protos = this._gaxGrpc.loadProtoJSON(jsonProtos);

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this.pathTemplates = {
      tablePathTemplate: new this._gaxModule.PathTemplate(
        'projects/{project}/instances/{instance}/tables/{table}'
      ),
    };

    // Some of the methods on this service provide streaming responses.
    // Provide descriptors for these.
    this.descriptors.stream = {
      readRows: new this._gaxModule.StreamDescriptor(gax.StreamType.SERVER_STREAMING),
      sampleRowKeys: new this._gaxModule.StreamDescriptor(gax.StreamType.SERVER_STREAMING),
      mutateRows: new this._gaxModule.StreamDescriptor(gax.StreamType.SERVER_STREAMING)
    };

    // Put together the default options sent with requests.
    this._defaults = this._gaxGrpc.constructSettings(
        'google.bigtable.v2.Bigtable', gapicConfig as gax.ClientConfig,
        opts.clientConfig || {}, {'x-goog-api-client': clientHeader.join(' ')});

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this.innerApiCalls = {};

    // Add a warn function to the client constructor so it can be easily tested.
    this.warn = gax.warn;
  }

  /**
   * Initialize the client.
   * Performs asynchronous operations (such as authentication) and prepares the client.
   * This function will be called automatically when any class method is called for the
   * first time, but if you need to initialize it before calling an actual method,
   * feel free to call initialize() directly.
   *
   * You can await on this method if you want to make sure the client is initialized.
   *
   * @returns {Promise} A promise that resolves to an authenticated service stub.
   */
  initialize() {
    // If the client stub promise is already initialized, return immediately.
    if (this.bigtableStub) {
      return this.bigtableStub;
    }

    // Put together the "service stub" for
    // google.bigtable.v2.Bigtable.
    this.bigtableStub = this._gaxGrpc.createStub(
        this._opts.fallback ?
          (this._protos as protobuf.Root).lookupService('google.bigtable.v2.Bigtable') :
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (this._protos as any).google.bigtable.v2.Bigtable,
        this._opts, this._providedCustomServicePath) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const bigtableStubMethods =
        ['readRows', 'sampleRowKeys', 'mutateRow', 'mutateRows', 'checkAndMutateRow', 'readModifyWriteRow'];
    for (const methodName of bigtableStubMethods) {
      const callPromise = this.bigtableStub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          const func = stub[methodName];
          return func.apply(stub, args);
        },
        (err: Error|null|undefined) => () => {
          throw err;
        });

      const descriptor =
        this.descriptors.stream[methodName] ||
        undefined;
      const apiCall = this._gaxModule.createApiCall(
        callPromise,
        this._defaults[methodName],
        descriptor
      );

      this.innerApiCalls[methodName] = apiCall;
    }

    return this.bigtableStub;
  }

  /**
   * The DNS address for this API service.
   * @returns {string} The DNS address for this service.
   */
  static get servicePath() {
    return 'bigtable.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   * @returns {string} The DNS address for this service.
   */
  static get apiEndpoint() {
    return 'bigtable.googleapis.com';
  }

  /**
   * The port for this API service.
   * @returns {number} The default port for this service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   * @returns {string[]} List of default scopes.
   */
  static get scopes() {
    return [
      'https://www.googleapis.com/auth/bigtable.data',
      'https://www.googleapis.com/auth/bigtable.data.readonly',
      'https://www.googleapis.com/auth/cloud-bigtable.data',
      'https://www.googleapis.com/auth/cloud-bigtable.data.readonly',
      'https://www.googleapis.com/auth/cloud-platform',
      'https://www.googleapis.com/auth/cloud-platform.read-only'
    ];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @returns {Promise} A promise that resolves to string containing the project ID.
   */
  getProjectId(callback?: Callback<string, undefined, undefined>):
      Promise<string>|void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  mutateRow(
      request?: protos.google.bigtable.v2.IMutateRowRequest,
      options?: CallOptions):
      Promise<[
        protos.google.bigtable.v2.IMutateRowResponse,
        protos.google.bigtable.v2.IMutateRowRequest|undefined, {}|undefined
      ]>;
  mutateRow(
      request: protos.google.bigtable.v2.IMutateRowRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.bigtable.v2.IMutateRowResponse,
          protos.google.bigtable.v2.IMutateRowRequest|null|undefined,
          {}|null|undefined>): void;
  mutateRow(
      request: protos.google.bigtable.v2.IMutateRowRequest,
      callback: Callback<
          protos.google.bigtable.v2.IMutateRowResponse,
          protos.google.bigtable.v2.IMutateRowRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Mutates a row atomically. Cells already present in the row are left
 * unchanged unless explicitly changed by `mutation`.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.tableName
 *   Required. The unique name of the table to which the mutation should be applied.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 * @param {string} request.appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 * @param {Buffer} request.rowKey
 *   Required. The key of the row to which the mutation should be applied.
 * @param {number[]} request.mutations
 *   Required. Changes to be atomically applied to the specified row. Entries are applied
 *   in order, meaning that earlier mutations can be masked by later ones.
 *   Must contain at least one entry and at most 100000.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [MutateRowResponse]{@link google.bigtable.v2.MutateRowResponse}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example
 * const [response] = await client.mutateRow(request);
 *
 * @example <caption>include:samples/generated/v2/bigtable.mutate_row.js</caption>
 * region_tag:bigtable_mutate_row_sample
 *
 */
  mutateRow(
      request?: protos.google.bigtable.v2.IMutateRowRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.bigtable.v2.IMutateRowResponse,
          protos.google.bigtable.v2.IMutateRowRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.bigtable.v2.IMutateRowResponse,
          protos.google.bigtable.v2.IMutateRowRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.bigtable.v2.IMutateRowResponse,
        protos.google.bigtable.v2.IMutateRowRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'table_name': request.tableName || '',
    });
    this.initialize();
    return this.innerApiCalls.mutateRow(request, options, callback);
  }
  checkAndMutateRow(
      request?: protos.google.bigtable.v2.ICheckAndMutateRowRequest,
      options?: CallOptions):
      Promise<[
        protos.google.bigtable.v2.ICheckAndMutateRowResponse,
        protos.google.bigtable.v2.ICheckAndMutateRowRequest|undefined, {}|undefined
      ]>;
  checkAndMutateRow(
      request: protos.google.bigtable.v2.ICheckAndMutateRowRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.bigtable.v2.ICheckAndMutateRowResponse,
          protos.google.bigtable.v2.ICheckAndMutateRowRequest|null|undefined,
          {}|null|undefined>): void;
  checkAndMutateRow(
      request: protos.google.bigtable.v2.ICheckAndMutateRowRequest,
      callback: Callback<
          protos.google.bigtable.v2.ICheckAndMutateRowResponse,
          protos.google.bigtable.v2.ICheckAndMutateRowRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Mutates a row atomically based on the output of a predicate Reader filter.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.tableName
 *   Required. The unique name of the table to which the conditional mutation should be
 *   applied.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 * @param {string} request.appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 * @param {Buffer} request.rowKey
 *   Required. The key of the row to which the conditional mutation should be applied.
 * @param {google.bigtable.v2.RowFilter} request.predicateFilter
 *   The filter to be applied to the contents of the specified row. Depending
 *   on whether or not any results are yielded, either `true_mutations` or
 *   `false_mutations` will be executed. If unset, checks that the row contains
 *   any values at all.
 * @param {number[]} request.trueMutations
 *   Changes to be atomically applied to the specified row if `predicate_filter`
 *   yields at least one cell when applied to `row_key`. Entries are applied in
 *   order, meaning that earlier mutations can be masked by later ones.
 *   Must contain at least one entry if `false_mutations` is empty, and at most
 *   100000.
 * @param {number[]} request.falseMutations
 *   Changes to be atomically applied to the specified row if `predicate_filter`
 *   does not yield any cells when applied to `row_key`. Entries are applied in
 *   order, meaning that earlier mutations can be masked by later ones.
 *   Must contain at least one entry if `true_mutations` is empty, and at most
 *   100000.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [CheckAndMutateRowResponse]{@link google.bigtable.v2.CheckAndMutateRowResponse}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example
 * const [response] = await client.checkAndMutateRow(request);
 *
 * @example <caption>include:samples/generated/v2/bigtable.check_and_mutate_row.js</caption>
 * region_tag:bigtable_check_and_mutate_row_sample
 *
 */
  checkAndMutateRow(
      request?: protos.google.bigtable.v2.ICheckAndMutateRowRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.bigtable.v2.ICheckAndMutateRowResponse,
          protos.google.bigtable.v2.ICheckAndMutateRowRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.bigtable.v2.ICheckAndMutateRowResponse,
          protos.google.bigtable.v2.ICheckAndMutateRowRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.bigtable.v2.ICheckAndMutateRowResponse,
        protos.google.bigtable.v2.ICheckAndMutateRowRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'table_name': request.tableName || '',
    });
    this.initialize();
    return this.innerApiCalls.checkAndMutateRow(request, options, callback);
  }
  readModifyWriteRow(
      request?: protos.google.bigtable.v2.IReadModifyWriteRowRequest,
      options?: CallOptions):
      Promise<[
        protos.google.bigtable.v2.IReadModifyWriteRowResponse,
        protos.google.bigtable.v2.IReadModifyWriteRowRequest|undefined, {}|undefined
      ]>;
  readModifyWriteRow(
      request: protos.google.bigtable.v2.IReadModifyWriteRowRequest,
      options: CallOptions,
      callback: Callback<
          protos.google.bigtable.v2.IReadModifyWriteRowResponse,
          protos.google.bigtable.v2.IReadModifyWriteRowRequest|null|undefined,
          {}|null|undefined>): void;
  readModifyWriteRow(
      request: protos.google.bigtable.v2.IReadModifyWriteRowRequest,
      callback: Callback<
          protos.google.bigtable.v2.IReadModifyWriteRowResponse,
          protos.google.bigtable.v2.IReadModifyWriteRowRequest|null|undefined,
          {}|null|undefined>): void;
/**
 * Modifies a row atomically on the server. The method reads the latest
 * existing timestamp and value from the specified columns and writes a new
 * entry based on pre-defined read/modify/write rules. The new value for the
 * timestamp is the greater of the existing timestamp or the current server
 * time. The method returns the new contents of all modified cells.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.tableName
 *   Required. The unique name of the table to which the read/modify/write rules should be
 *   applied.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 * @param {string} request.appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 * @param {Buffer} request.rowKey
 *   Required. The key of the row to which the read/modify/write rules should be applied.
 * @param {number[]} request.rules
 *   Required. Rules specifying how the specified row's contents are to be transformed
 *   into writes. Entries are applied in order, meaning that earlier rules will
 *   affect the results of later ones.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Promise} - The promise which resolves to an array.
 *   The first element of the array is an object representing [ReadModifyWriteRowResponse]{@link google.bigtable.v2.ReadModifyWriteRowResponse}.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#regular-methods)
 *   for more details and examples.
 * @example
 * const [response] = await client.readModifyWriteRow(request);
 *
 * @example <caption>include:samples/generated/v2/bigtable.read_modify_write_row.js</caption>
 * region_tag:bigtable_read_modify_write_row_sample
 *
 */
  readModifyWriteRow(
      request?: protos.google.bigtable.v2.IReadModifyWriteRowRequest,
      optionsOrCallback?: CallOptions|Callback<
          protos.google.bigtable.v2.IReadModifyWriteRowResponse,
          protos.google.bigtable.v2.IReadModifyWriteRowRequest|null|undefined,
          {}|null|undefined>,
      callback?: Callback<
          protos.google.bigtable.v2.IReadModifyWriteRowResponse,
          protos.google.bigtable.v2.IReadModifyWriteRowRequest|null|undefined,
          {}|null|undefined>):
      Promise<[
        protos.google.bigtable.v2.IReadModifyWriteRowResponse,
        protos.google.bigtable.v2.IReadModifyWriteRowRequest|undefined, {}|undefined
      ]>|void {
    request = request || {};
    let options: CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    }
    else {
      options = optionsOrCallback as CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'table_name': request.tableName || '',
    });
    this.initialize();
    return this.innerApiCalls.readModifyWriteRow(request, options, callback);
  }

/**
 * Streams back the contents of all requested rows in key order, optionally
 * applying the same Reader filter to each. Depending on their size,
 * rows and cells may be broken up across multiple responses, but
 * atomicity of each row will still be preserved. See the
 * ReadRowsResponse documentation for details.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.tableName
 *   Required. The unique name of the table from which to read.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 * @param {string} request.appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 * @param {google.bigtable.v2.RowSet} request.rows
 *   The row keys and/or ranges to read. If not specified, reads from all rows.
 * @param {google.bigtable.v2.RowFilter} request.filter
 *   The filter to apply to the contents of the specified row(s). If unset,
 *   reads the entirety of each row.
 * @param {number} request.rowsLimit
 *   The read will terminate after committing to N rows' worth of results. The
 *   default (zero) is to return all results.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Stream}
 *   An object stream which emits [ReadRowsResponse]{@link google.bigtable.v2.ReadRowsResponse} on 'data' event.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#server-streaming)
 *   for more details and examples.
 * @example
 * const stream = client.readRows(request);
 * stream.on('data', (response) => { ... });
 * stream.on('end', () => { ... });
 */
  readRows(
      request?: protos.google.bigtable.v2.IReadRowsRequest,
      options?: CallOptions):
    gax.CancellableStream{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'table_name': request.tableName || '',
    });
    this.initialize();
    return this.innerApiCalls.readRows(request, options);
  }

/**
 * Returns a sample of row keys in the table. The returned row keys will
 * delimit contiguous sections of the table of approximately equal size,
 * which can be used to break up the data for distributed tasks like
 * mapreduces.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.tableName
 *   Required. The unique name of the table from which to sample row keys.
 *   Values are of the form
 *   `projects/<project>/instances/<instance>/tables/<table>`.
 * @param {string} request.appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Stream}
 *   An object stream which emits [SampleRowKeysResponse]{@link google.bigtable.v2.SampleRowKeysResponse} on 'data' event.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#server-streaming)
 *   for more details and examples.
 * @example
 * const stream = client.sampleRowKeys(request);
 * stream.on('data', (response) => { ... });
 * stream.on('end', () => { ... });
 */
  sampleRowKeys(
      request?: protos.google.bigtable.v2.ISampleRowKeysRequest,
      options?: CallOptions):
    gax.CancellableStream{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'table_name': request.tableName || '',
    });
    this.initialize();
    return this.innerApiCalls.sampleRowKeys(request, options);
  }

/**
 * Mutates multiple rows in a batch. Each individual row is mutated
 * atomically as in MutateRow, but the entire batch is not executed
 * atomically.
 *
 * @param {Object} request
 *   The request object that will be sent.
 * @param {string} request.tableName
 *   Required. The unique name of the table to which the mutations should be applied.
 * @param {string} request.appProfileId
 *   This value specifies routing for replication. If not specified, the
 *   "default" application profile will be used.
 * @param {number[]} request.entries
 *   Required. The row keys and corresponding mutations to be applied in bulk.
 *   Each entry is applied as an atomic mutation, but the entries may be
 *   applied in arbitrary order (even between entries for the same row).
 *   At least one entry must be specified, and in total the entries can
 *   contain at most 100000 mutations.
 * @param {object} [options]
 *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
 * @returns {Stream}
 *   An object stream which emits [MutateRowsResponse]{@link google.bigtable.v2.MutateRowsResponse} on 'data' event.
 *   Please see the
 *   [documentation](https://github.com/googleapis/gax-nodejs/blob/master/client-libraries.md#server-streaming)
 *   for more details and examples.
 * @example
 * const stream = client.mutateRows(request);
 * stream.on('data', (response) => { ... });
 * stream.on('end', () => { ... });
 */
  mutateRows(
      request?: protos.google.bigtable.v2.IMutateRowsRequest,
      options?: CallOptions):
    gax.CancellableStream{
    request = request || {};
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'table_name': request.tableName || '',
    });
    this.initialize();
    return this.innerApiCalls.mutateRows(request, options);
  }

  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified table resource name string.
   *
   * @param {string} project
   * @param {string} instance
   * @param {string} table
   * @returns {string} Resource name string.
   */
  tablePath(project:string,instance:string,table:string) {
    return this.pathTemplates.tablePathTemplate.render({
      project: project,
      instance: instance,
      table: table,
    });
  }

  /**
   * Parse the project from Table resource.
   *
   * @param {string} tableName
   *   A fully-qualified path representing Table resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromTableName(tableName: string) {
    return this.pathTemplates.tablePathTemplate.match(tableName).project;
  }

  /**
   * Parse the instance from Table resource.
   *
   * @param {string} tableName
   *   A fully-qualified path representing Table resource.
   * @returns {string} A string representing the instance.
   */
  matchInstanceFromTableName(tableName: string) {
    return this.pathTemplates.tablePathTemplate.match(tableName).instance;
  }

  /**
   * Parse the table from Table resource.
   *
   * @param {string} tableName
   *   A fully-qualified path representing Table resource.
   * @returns {string} A string representing the table.
   */
  matchTableFromTableName(tableName: string) {
    return this.pathTemplates.tablePathTemplate.match(tableName).table;
  }

  /**
   * Terminate the gRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   * @returns {Promise} A promise that resolves when the client is closed.
   */
  close(): Promise<void> {
    this.initialize();
    if (!this._terminated) {
      return this.bigtableStub!.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
