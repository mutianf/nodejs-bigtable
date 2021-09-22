// Copyright 2021 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.


'use strict';

function main(tableName, rowKey, rules) {
  // [START bigtable_read_modify_write_row_sample]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the table to which the read/modify/write rules should be
   *  applied.
   *  Values are of the form
   *  `projects/<project>/instances/<instance>/tables/<table>`.
   */
  // const tableName = 'abc123'
  /**
   *  This value specifies routing for replication. If not specified, the
   *  "default" application profile will be used.
   */
  // const appProfileId = 'abc123'
  /**
   *  Required. The key of the row to which the read/modify/write rules should be applied.
   */
  // const rowKey = 'Buffer.from('string')'
  /**
   *  Required. Rules specifying how the specified row's contents are to be transformed
   *  into writes. Entries are applied in order, meaning that earlier rules will
   *  affect the results of later ones.
   */
  // const rules = 1234

  // Imports the Bigtable library
  const {BigtableClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const bigtableClient = new BigtableClient();

  async function readModifyWriteRow() {
    // Construct request
    const request = {
      tableName,
      rowKey,
      rules,
    };

    // Run request
    const response = await bigtableClient.readModifyWriteRow(request);
    console.log(response);
  }

  readModifyWriteRow();
  // [END bigtable_read_modify_write_row_sample]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
