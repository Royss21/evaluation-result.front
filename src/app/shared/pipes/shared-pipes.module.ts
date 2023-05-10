import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyImgPipe } from './lazy-img.pipe';
import { PrettyjsonPipe } from './pretty-json.pipe';
import { TruncateTextPipe } from './truncate-text.pipe';

const pipes = [LazyImgPipe, TruncateTextPipe, PrettyjsonPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [pipes],
  exports: [pipes],
})
export class SharedPipesModule {}
