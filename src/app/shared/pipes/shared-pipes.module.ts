import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyImgPipe } from './lazy-img.pipe';
import {  TruncateTextPipe } from './truncate-text.pipe';

const pipes = [LazyImgPipe];
const pipeTrun = [TruncateTextPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [pipes, pipeTrun],
  exports: [pipes, pipeTrun]
})
export class SharedPipesModule {}
