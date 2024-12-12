import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '../../Auth/auth/interceptors/auth.interceptor';



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[ReactiveFormsModule,FormsModule],
  providers: [provideHttpClient(withFetch(),withInterceptors([authInterceptor]))],
})
export class SharedModule { }
