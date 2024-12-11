import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    ReactiveFormsModule
  ],
  exports:[ReactiveFormsModule],
  providers: [provideHttpClient(withFetch())],
})
export class SharedModule { }
