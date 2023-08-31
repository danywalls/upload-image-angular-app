import { Component } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { FakeImageUploadService } from 'src/app/services/fake-image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {

  constructor(private fakeImageUploadService: FakeImageUploadService) { }

  selectedImage!: FileList;

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement?.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files;
    }
  }

  uploadImage(): void {
    this.fakeImageUploadService.uploadImage(this.selectedImage[0]);
  }

  imagesUrl: Array<string> = [];
  uploading = false;

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event?.dataTransfer?.files) {
      this.uploadFiles(event.dataTransfer.files);
    }
  }

  private uploadFiles(images: FileList) {
    for (let index = 0; index < images.length; index++) {
      const element = images[index];

      this.fakeImageUploadService
        .uploadImage(element)
        .pipe(
          catchError(() => {
            tap(() => (this.uploading = false));
            return EMPTY;
          })
        )
        .subscribe((p) => {
          this.imagesUrl.push(p);
        });
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
