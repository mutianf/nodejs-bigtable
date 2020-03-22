// Copyright 2019 Google LLC
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

import {packNTest} from 'pack-n-play';
import {readFileSync} from 'fs';
import {describe, it} from 'mocha';

describe('typescript consumer tests', () => {
  it('should have correct type signature for typescript users', async () => {
    const options = {
      packageDir: process.cwd(), // path to your module.
      sample: {
        description: 'typescript based user can use the type definitions',
        ts: readFileSync(
          './system-test/fixtures/sample/src/index.ts'
        ).toString(),
      },
    };
    await packNTest(options); // will throw upon error.
  }).timeout(300000);

  it('should have correct type signature for javascript users', async () => {
    const options = {
      packageDir: process.cwd(), // path to your module.
      sample: {
        description: 'typescript based user can use the type definitions',
        ts: readFileSync(
          './system-test/fixtures/sample/src/index.js'
        ).toString(),
      },
    };
    await packNTest(options); // will throw upon error.
  }).timeout(300000);
});
