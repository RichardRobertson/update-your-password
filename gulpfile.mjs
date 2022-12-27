import { deleteAsync } from 'del';
import gulp from 'gulp';
import gulpJsonModify from 'gulp-json-modify';
import { readFileSync } from 'fs';
import GulpZip from 'gulp-zip';

function clean() {
	return deleteAsync(['./build/', './dist/']);
}

function copyStatic() {
	return gulp.src(['./LICENSE.md', './README.md', './lang/*', './scripts/**/*'], { base: './' }).pipe(gulp.dest('./build/'));
}

function copyDynamic() {
	const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
	return gulp.src('./module.json')
		.pipe(gulpJsonModify({ key: 'version', value: packageJson.version }))
		.pipe(gulpJsonModify({ key: 'download', value: `https://github.com/RichardRobertson/update-your-password/releases/download/v${packageJson.version}/update-your-password-v${packageJson.version}.zip` }))
		.pipe(gulp.dest('./build/'));
}

function zip() {
	const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));
	return gulp.src('./build/**/*', { base: './build/' })
		.pipe(GulpZip(`update-your-password-v${packageJson.version}.zip`))
		.pipe(gulp.src('./build/module.json'))
		.pipe(gulp.dest('./dist/'));
}

const build = gulp.parallel(copyStatic, copyDynamic);

const _default = gulp.series(clean, build, zip);

export default _default;
export { build, clean, zip };
