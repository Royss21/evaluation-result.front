import { Component, forwardRef, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { IFileItem } from './interfaces/file-item.interface';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ]
})
export class UploadFileComponent implements ControlValueAccessor, Validator {

/*
  FALTA VALIDAR CUANDO NO ES MULTIPLE, QUE SOLO PERMITA SBUIR 1 ARCHIVO Y MOSTRAR SOLO 1
  FALTA AGREGAR EL SCROLL CUANDO HAY VARIOS ARCHIVOS
*/

  @Input() isMultiple: boolean = false;
  @Input() acceptFiles: string = "*";

  filesSelected: IFileItem [] = [];
  files: File[] | null = null;

  private _onChanged: Function = ( files: File[] | null) => {}
  private _onTouched: Function = ( files: File[] | null) => {}

  private getExtension(name: string){
    return name.slice((Math.max(0, name.lastIndexOf(".")) || Infinity) + 1);
  }


  changeFiles( event: any) {

    const files = event.target.files;

    if(files || files.length > 0)
    {
      for(let file of files){

        const fileItem = {
          name: file.name,
          extension: this.getExtension(file.name),
          file: file
        } as  IFileItem;

        if(['xlsx','xlx'].includes(fileItem.extension))
          fileItem.imagen = '../../../../../assets/images/icon-excel.png';
        else{

          const reader = new FileReader();

          reader.readAsDataURL( file );
          reader.onloadend = () => {
            fileItem.imagenBuffer = reader.result;
          }
        }

        if(!this.filesSelected.some(fl => fl.name === fileItem.name))
          this.filesSelected = [fileItem, ...this.filesSelected];
      }
    }

    event.target.value = null;
    this._onChanged?.(Array.from(this.filesSelected.map(fs => fs.file)));
  }

  deleteFile(name: string){
    this.filesSelected = this.filesSelected.filter(fs => fs.name !== name);
    this._onChanged?.(Array.from(this.filesSelected.map(fs => fs.file)));
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return (this.filesSelected.length || 0) > 0
      ? null
      : { invalidFiles: true }
  }

  writeValue(files: File[]): void {
    this.files = files;
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

}
