import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from "../shared/shared.module";
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { TaskItemComponent } from './components/task-item/task-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    DashboardComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskItemComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule
]
})
export class FeaturesModule { }
