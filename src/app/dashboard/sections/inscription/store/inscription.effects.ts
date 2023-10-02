import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import { InscriptionActions } from './inscription.actions';
import {HttpClient} from "@angular/common/http";
import {InscriptionService} from "../services/inscription.service";
import {Student} from "../../student/student";
import {environment} from "../../../../../environment/environment";
import {Client} from "../../client/client";
import {Store} from "@ngrx/store";
import {NotificationService} from "../../../../shared/service/notification.service";


@Injectable()
export class InscriptionEffects {

  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionService.loadInscription().pipe(
          map(data => InscriptionActions.loadInscriptionsSuccess({ data })),
          catchError(error => of(InscriptionActions.loadInscriptionsFailure({ error }))))
      )
    );
  });

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionActions.loadStudents),
      concatMap(() =>
        this.loadStudents().pipe(
          map(students => InscriptionActions.loadStudentsSuccess({ students })),
          catchError(error => of(InscriptionActions.loadStudentsFailure({ error }))))
      )
    );
  });

  loadCurses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.loadCurses),
      concatMap(() =>
        this.loadCurses().pipe(
          map(curses => InscriptionActions.loadCursesSuccess({ curses })),
          catchError(error => of(InscriptionActions.loadCursesFailure({ error }))))
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscription),
      concatMap((action) =>
        this.inscriptionService.createInscription(action.payload).pipe(
          map(_ => {
            this.notification.success('New Inscription Created');
            return InscriptionActions.createInscriptionSuccess();
          }),
          catchError(error => {
            this.notification.error('Error creating new inscription');
            return of(InscriptionActions.createInscriptionFailure({error}))
          }))
      )
    );
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.createInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });

  updateInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.updateInscription),
      concatMap((action) =>
        this.inscriptionService.editInscription(action.id ,action.payload).pipe(
          map(_ => {
            this.notification.success('Inscription Updated');
            return InscriptionActions.updateInscriptionSuccess();
          }),
          catchError(error => {
            this.notification.error("The inscription can't be updated");
            return of(InscriptionActions.updateInscriptionFailure({error}))
          }))
      )
    );
  });

  updateInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionActions.updateInscriptionSuccess),
      map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(InscriptionActions.deleteInscription),
        concatMap((action) =>
            this.inscriptionService.deleteInscription(action.id).pipe(
                map(_ => {
                  this.notification.success("Inscription deleted");
                  return InscriptionActions.deleteInscriptionSuccess()
                }),
                catchError(error => {
                  this.notification.error("Error deleting Inscription");
                  return of(InscriptionActions.deleteInscriptionFailure({ error }))
                }))
        )
    );
  });

  deleteInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(InscriptionActions.deleteInscriptionSuccess),
        map(() => this.store.dispatch(InscriptionActions.loadInscriptions()))
    );
  }, { dispatch: false });

  constructor(
      private actions$: Actions,
      private httpClient: HttpClient,
      private inscriptionService: InscriptionService,
      private store: Store,
      private notification: NotificationService
  ) {}

  private loadStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
  }
  private loadCurses(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(environment.baseApiUrl + '/curses')
  }

}
