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

function main(name) {
  // [START admin_v2_generated_BigtableTableAdmin_GetSnapshot_async]
  /**
   * TODO(developer): Uncomment these variables before running the sample.
   */
  /**
   *  Required. The unique name of the requested snapshot.
   *  Values are of the form
   *  `projects/{project}/instances/{instance}/clusters/{cluster}/snapshots/{snapshot}`.
   */
  // const name = 'abc123'

  // Imports the Admin library
  const {BigtableTableAdminClient} = require('@google-cloud/bigtable').v2;

  // Instantiates a client
  const adminClient = new BigtableTableAdminClient();

  async function getSnapshot() {
    // Construct request
    const request = {
      name,
    };

    // Run request
    const response = await adminClient.getSnapshot(request);
    console.log(response);
  }

  getSnapshot();
  // [END admin_v2_generated_BigtableTableAdmin_GetSnapshot_async]
}

process.on('unhandledRejection', err => {
  console.error(err.message);
  process.exitCode = 1;
});
main(...process.argv.slice(2));
