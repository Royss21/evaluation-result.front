import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { ConstantsGeneral } from '@shared/constants';
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
export class UploadFileComponent implements ControlValueAccessor, Validator, OnInit {

  public isLoading: boolean = false

  private drop: any;
  private text: any;

  @Input() isMultiple: boolean = false;
  @Input() acceptFiles = Array<any>();

  public filesSelected: IFileItem [] = [];
  private file: File | undefined;

  private _onChanged: Function = ( files: File[] | null) => {}
  private _onTouched: Function = ( files: File[] | null) => {}

  ngOnInit(): void {
    this.drop = document.querySelector(".drop")!;
    this.text = document.querySelector(".text")!;
  }

  public existFile(): Boolean {
    return this.filesSelected.length > 0;
  }

  private getExtension(name: string){
    return name.slice((Math.max(0, name.lastIndexOf(".")) || Infinity) + 1);
  }


  changeFiles(event: any) {

    // const files = event.target.files;

    // if(files || files.length > 0)
    // {
    //   for(let file of files){

    //     const fileItem = {
    //       name: file.name,
    //       extension: this.getExtension(file.name),
    //       file: file
    //     } as  IFileItem;

    //     if(['xlsx','xlx'].includes(fileItem.extension))
    //       fileItem.imagen = '../../../../../assets/images/icon-excel.png';
    //     else{

    //       const reader = new FileReader();

    //       reader.readAsDataURL( file );
    //       reader.onloadend = () => {
    //         fileItem.imagenBuffer = reader.result;
    //       }
    //     }

    //     if(!this.filesSelected.some(fl => fl.name === fileItem.name))
    //       this.filesSelected = [fileItem, ...this.filesSelected];
    //   }
    // }

    // event.target.value = null;
    // this._onChanged?.(Array.from(this.filesSelected.map(fs => fs.file)));
  }

  changeFn(event: Event): void {
    event.preventDefault();
    this.drop.classList.remove("type-file-error");
    this.file = (<HTMLInputElement>event.target).files?.[0];
    if (!this.file) return;
    this._setFile();
  }

  private _setFile(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 2000)


    const fileItem = {
      name: this.file?.name,
      extension: this.getExtension(this.file?.name!),
      file: this.file
    } as  IFileItem;

    if(!['xlsx','xlx'].includes(fileItem.extension)) {
      const reader = new FileReader();

      reader.readAsDataURL( this.file! );
      reader.onloadend = () => {
        fileItem.imagenBuffer = reader.result;
      }
    }

    if(!this.filesSelected.some(fl => fl.name === fileItem.name))
      this.filesSelected = [fileItem, ...this.filesSelected];

    this._onChanged?.(Array.from(this.filesSelected.map(fs => fs.file)));
  }

  dragOverFn(event: Event): void {
    event.preventDefault();
    this.text.innerHTML = "Suelte el mouse para soltar";
    this.drop.classList.add("active");
  }

  dragLeaveFn(event: Event): void {
    event.preventDefault();
    this.text.innerHTML = "Arrastre y suelte tu archivo.";
    this.drop.classList.remove("active");
  }

  dropFn(event: any): void {
    event.preventDefault();
    this.drop.classList.remove("type-file-error");

    const eventFile = event.dataTransfer.files[0];

    if (!this.acceptFiles.includes(eventFile.type)) {
      this.text.innerHTML = "Arrastre y suelte tu archivo.";
      this.drop.classList.remove("active");
      this.drop.classList.add("type-file-error");
      return;
    }

    this.file = eventFile;
    this._setFile();
    this.text.innerHTML = "Arrastre y suelte tu archivo.";
  }

  deleteFile(): void {
    this.filesSelected.pop();
    this._onChanged?.(Array.from(this.filesSelected.map(fs => fs.file)));
  }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return (this.filesSelected.length || 0) > 0
      ? null
      : { invalidFiles: true }
  }

  writeValue(files: File[]): void {
    // this.files = files;
  }

  registerOnChange(fn: any): void {
    this._onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
}
