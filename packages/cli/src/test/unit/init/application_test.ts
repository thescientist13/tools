/*
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt The complete set of authors may be found
 * at http://polymer.github.io/AUTHORS.txt The complete set of contributors may
 * be found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by
 * Google as part of the polymer project is also subject to an additional IP
 * rights grant found at http://polymer.github.io/PATENTS.txt
 */

import {assert} from 'chai';
import * as fs from 'fs-extra';
import * as path from 'path';

import * as yoAssert from 'yeoman-assert';
import * as helpers from 'yeoman-test';
import {createApplicationGenerator} from '../../../init/application/application';

suite('init/application', () => {

  test(
      'creates expected 1.x files while passed the 1.x template name',
      (done) => {
        const TestGenerator = createApplicationGenerator('polymer-1.x');
        helpers.run(TestGenerator)
            .withPrompts({name: 'foobar'})
            .on('end', () => {
              yoAssert.file(['bower.json']);
              yoAssert.fileContent(
                  'src/foobar-app/foobar-app.html', 'Polymer({');
              done();
            });
      });

  test(
      'creates expected 2.x files while passed the 2.x template name',
      (done) => {
        const TestGenerator = createApplicationGenerator('polymer-2.x');
        helpers.run(TestGenerator)
            .withPrompts({name: 'foobar'})
            .on('end', () => {
              yoAssert.file(['bower.json']);
              yoAssert.fileContent(
                  'src/foobar-app/foobar-app.html',
                  'class FoobarApp extends Polymer.Element');
              done();
            });
      });

  test(
      'index.html description meta tag matches description prompt (1.x)',
      (done) => {
        const TestGenerator = createApplicationGenerator('polymer-1.x');
        const description = 'This is a description entered by the prompt';
        helpers.run(TestGenerator)
            .withPrompts({name: 'foobar', description: description})
            .on('end', () => {
              yoAssert.fileContent(
                  'index.html',
                  `<meta name="description" content="${description}">`);
              done();
            });
      });

  test(
      'index.html description meta tag contains default without prompt (1.x)',
      (done) => {
        const TestGenerator = createApplicationGenerator('polymer-1.x');
        helpers.run(TestGenerator)
            .withPrompts({name: 'foobar'})
            .on('end', () => {
              yoAssert.fileContent(
                  'index.html',
                  '<meta name="description" content="foobar description">');
              done();
            });
      });

  test(
      'index.html description meta tag matches description prompt (2.x)',
      (done) => {
        const TestGenerator = createApplicationGenerator('polymer-2.x');
        const description = 'This is a description entered by the prompt';
        helpers.run(TestGenerator)
            .withPrompts({name: 'foobar', description: description})
            .on('end', () => {
              yoAssert.fileContent(
                  'index.html',
                  `<meta name="description" content="${description}">`);
              done();
            });
      });

  test(
      'index.html description meta tag contains default without prompt (2.x)',
      (done) => {
        const TestGenerator = createApplicationGenerator('polymer-2.x');
        helpers.run(TestGenerator)
            .withPrompts({name: 'foobar'})
            .on('end', () => {
              yoAssert.fileContent(
                  'index.html',
                  '<meta name="description" content="foobar description">');
              done();
            });
      });

  test(
      'ignoring filenames with dangling underscores when generating templates',
      (done) => {
        const TestGenerator = createApplicationGenerator('polymer-1.x');
        helpers.run(TestGenerator).on('end', () => {
          yoAssert.noFile(['src/_element/_element.html']);
          done();
        });
      });

  test('works when package.json with no name is present', (done) => {
    const TestGenerator = createApplicationGenerator('polymer-1.x');
    helpers.run(TestGenerator)
        .inTmpDir((tempDir: string) => {
          fs.writeFileSync(path.join(tempDir, 'package.json'), '{}');
        })
        .on('error',
            (_error: {}) => {
              assert.fail();
              done();
            })
        .on('end', () => {
          done();
        });
  });

});
