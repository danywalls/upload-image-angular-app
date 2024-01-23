import { Component } from '@angular/core';
import { UploadComponent, UploadsModule } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-image-upload',
  standalone: true,
  imports: [UploadsModule],
  templateUrl: './image-upload.component.html',
  styleUrl: './image-upload.component.scss',
})
export class ImageUploadComponent {
  imagesUrl: Array<string> = [];

  onFinish(file: UploadComponent) {
    file.clearFiles();
  }

  onSave() {
    this.imagesUrl.push('https://random.imagecdn.app/500/150');
  }
}
