import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterModule} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ModelListComponent } from './model-list/model-list.component';
import { TrainingSeriesComponent } from './training-series/training-series.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ValidationsComponent } from './validations/validations.component';
import { ToastrModule } from 'ngx-toastr';
import { Model, Prediction, Globals, Manager, Similarity } from './Globals';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfigTrainingComponent } from './config-training/config-training.component';
import { ConfigModelComponent } from './config-model/config-model.component';
import { ConfigPreferencesComponent } from './config-preferences/config-preferences.component';
import { ChecklistModule } from 'angular-checklist';
import { ChartsModule } from 'ng2-charts';
import { QualitNoConformalComponent } from './qualit-no-conformal/qualit-no-conformal.component';
import { QualitConformalComponent } from './qualit-conformal/qualit-conformal.component';
import { QuantitNoConformalComponent } from './quantit-no-conformal/quantit-no-conformal.component';
import { QuantitConformalComponent } from './quantit-conformal/quantit-conformal.component';
import { BuilderComponent } from './builder/builder.component';
import { PredictorComponent } from './predictor/predictor.component';
import { PredictionSeriesComponent } from './prediction-series/prediction-series.component';
import { PredictionComponent } from './prediction/prediction.component';
import { DataTableModule } from 'angular-6-datatable';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { SimilarityComponent } from './similarity/similarity.component';
import { ModelingSidebarComponent } from './modeling-sidebar/modeling-sidebar.component';
import { NewSimilarityComponent } from './new-similarity/new-similarity.component';
import { SimilaritySidebarComponent } from './similarity-sidebar/similarity-sidebar.component';
import { PredictionListComponent } from './prediction-list/prediction-list.component';
import { ManageModelsComponent } from './manage-models/manage-models.component';
import { ManagePredictionsComponent } from './manage-predictions/manage-predictions.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ModelListComponent,
    TrainingSeriesComponent,
    SidebarComponent,
    ValidationsComponent,
    ConfigTrainingComponent,
    ConfigModelComponent,
    ConfigPreferencesComponent,
    QualitNoConformalComponent,
    QualitConformalComponent,
    QuantitNoConformalComponent,
    QuantitConformalComponent,
    BuilderComponent,
    PredictorComponent,
    PredictionSeriesComponent,
    PredictionComponent,
    SimilarityComponent,
    ModelingSidebarComponent,
    NewSimilarityComponent,
    SimilaritySidebarComponent,
    PredictionListComponent,
    ManageModelsComponent,
    ManagePredictionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    ChecklistModule,
    ChartsModule,
    DataTableModule,
    NgbModule

  ],
  providers: [Model, Prediction, Globals, Manager, Similarity],
  bootstrap: [AppComponent]
})

export class AppModule { }
