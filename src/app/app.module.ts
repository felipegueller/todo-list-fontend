import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainSidebarModule } from './main-sidebar/main-sidebar.module';

import { TaskListService } from './task-list/task-list.service';
import { TaskService } from './tasks/task.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MainSidebarModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [TaskService, TaskListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
