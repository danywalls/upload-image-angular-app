import { Component } from '@angular/core';
import { EMPTY, catchError, tap } from 'rxjs';
import { FakeImageUploadService } from 'src/app/services/fake-image-upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
})
export class ImageUploadComponent {
  constructor(private fakeImageUploadService: FakeImageUploadService) {}

  selectedImage!: FileList;
  imagesUrl: Array<string> = [];
  uploading = false;

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement?.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files;
    }
  }

  uploadImage(): void {
    if (this.selectedImage) {
      this.uploadFiles(this.selectedImage);
    }
  }

  private uploadFiles(images: FileList) {
    this.uploading = true;
    for (let index = 0; index < images.length; index++) {
      const element = images[index];
      this.fakeImageUploadService.uploadImage(element).subscribe((p) => {
        this.imagesUrl.push(p);
        this.uploading = false;
      });
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event?.dataTransfer?.files) {
      this.uploadFiles(event.dataTransfer.files);
    }
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }
}
