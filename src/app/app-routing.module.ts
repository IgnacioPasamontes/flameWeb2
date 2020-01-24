import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModelListComponent } from './model-list/model-list.component';
import { CommonModule } from '@angular/common';
import { TrainingSeriesComponent } from './training-series/training-series.component';
import { ValidationsComponent } from './validations/validations.component';
import { PredictionSeriesComponent } from './prediction-series/prediction-series.component';
import { PredictionComponent } from './prediction/prediction.component';
import { SimilarityComponent, } from './similarity/similarity.component';
import { BuilderComponent, } from './builder/builder.component';
import { PredictionListComponent } from './prediction-list/prediction-list.component';
import { PredictorComponent } from './predictor/predictor.component';

const routes: Routes = [
  /*{
    path: 'training-series',
    component: TrainingSeriesComponent
  },*/


  { path: 'modeling/predictions', component: PredictionListComponent },
  { path: 'modeling/models', component: ModelListComponent },
  { path: 'trainigseries', component: TrainingSeriesComponent },
  { path: 'validation', component: ValidationsComponent },
  { path: 'predictor', component: PredictorComponent },
  { path: 'builder', component: BuilderComponent },
  { path: 'predictionseries', component: PredictionSeriesComponent },
  { path: 'prediction', component: PredictionComponent },
  { path: 'similarity', component: SimilarityComponent },
  { path: '', redirectTo: '/modeling/predictions', pathMatch: 'full'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {}
