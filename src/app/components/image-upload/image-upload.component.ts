import { FakeImageUploadService } from './../../services/fake-image-upload.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent {
  fakeImageUploadService = inject(FakeImageUploadService);
  uploading = false;
  selectedImages!: FileList;
  imagesUrl: Array<string> = [];

  onImageSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement?.files && inputElement.files.length > 0) {
      this.selectedImages = inputElement.files;
    }
  }

  upload(): void {
    if (this.selectedImages) {
      this.uploadFiles(this.selectedImages);
    }
  }

  private uploadFiles(images: FileList): void {
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
