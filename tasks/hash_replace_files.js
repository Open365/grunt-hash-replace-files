/*
 Copyright (c) 2016 eyeOS

 This file is part of Open365.

 Open365 is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License as
 published by the Free Software Foundation, either version 3 of the
 License, or (at your option) any later version.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

module.exports = function (grunt) {


	grunt.registerMultiTask('hash_replace_files', 'Hash passed files and replace these occurrences', function () {
		var hashFiles = require('hash-files');
		var fs = require('fs');
		var path = require('path');
		var async = require("async");
		var done = this.async();

		var options = this.options({
			whereToReplace: [],
			files: ''
		});

		var whereToReplace = options.whereToReplace;
		var files = options.files;


		console.log('Options: files: %s and whereToReplace %s', files, whereToReplace);
		var hashOptions = {
			files: files
		};

		hashFiles(hashOptions, function (error, hash) {
			function getHashedFilename (originalFilename, hash) {
				var splittedName = originalFilename.split('.');
				splittedName[splittedName.length - 1] = hash + '.' + splittedName[splittedName.length - 1];
				return splittedName.join('.');
			}

			function renameFile (filepath, cb) {
				var hashedFilePath = filepath.replace(originalFilename, hashedFilename);
				fs.rename(filepath, hashedFilePath, function (err) {
					if (err) {
						cb('Error renaming filepath: ' + err);
					}
					console.log('Filename hashed', hashedFilePath);
					cb();
				});
			}

			function replaceFileReferences (file) {
				var fileContent = grunt.file.read(file);
				var regex = new RegExp(originalFilename, 'g');
				var replacedFileContent = fileContent.replace(regex, hashedFilename);
				grunt.file.write(file, replacedFileContent);
			}

			if (!error) {
				var filesPath = grunt.file.expand(files);
				var originalFilename = path.basename(filesPath[0], hash);
				var hashedFilename = getHashedFilename(originalFilename, hash);

				whereToReplace.forEach(replaceFileReferences);
				async.each(filesPath, renameFile, done);
			}
		});

	});
};
