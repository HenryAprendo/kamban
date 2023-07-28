import { Component, ChangeDetectorRef, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterOutlet } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';

import { BoardService } from './../../../services/board.service';
import { Board, CreateBoardDTO } from './../../../model/board.model';
import { Observable } from 'rxjs';
import { DialogInputDataComponent } from '../dialog-input-data/dialog-input-data.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnDestroy {

  private defaultTitle = 'new title';

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  private boardService = inject(BoardService);

  listBoard: Observable<Board[]> = this.boardService.arrayBoards$;

  constructor(changeDetectorRef:ChangeDetectorRef, media:MediaMatcher, public dialog:MatDialog){
    this.mobileQuery = media.matchMedia('(min-width:640px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogInputDataComponent,{
      data: {title: this.defaultTitle}
    });

    dialogRef.afterClosed().subscribe(newTitle => {
      if(newTitle !== undefined && newTitle.length > 0){
        const board:Board = {
          boardId: 0,
          title: newTitle,
          listTodo: [],
          listDoing: [],
          listDone: []
        }
        this.boardService.addBoard(board);
      }
    })
  }


  ngOnDestroy(): void {
    this.mobileQuery.addEventListener('change',this._mobileQueryListener);
  }

}












