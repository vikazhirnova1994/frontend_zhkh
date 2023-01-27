import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, catchError, Observable, of, startWith} from "rxjs";
import {ApiResponse} from "../../_interface/api-response";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {UserGagePage} from "../../_interface/user-gage-page";
import {map} from "rxjs/operators";
import {StorageService} from "../../_services/storage.service";
import {GageDataService} from "../../_services/gage.data.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ExcelService} from "../../_services/excel.service";

@Component({
  selector: 'app-all-gage-data',
  templateUrl: './all-gage-data.component.html',
  styleUrls: ['./all-gage-data.component.css']
})
export class AllGageDataComponent implements OnInit {

  public gageDateState$ = Observable<{ appState: string, appData?: ApiResponse<UserGagePage>, error?: HttpErrorResponse }>;
  private isLoggedIn = false;
  public responseSubject = new BehaviorSubject<ApiResponse<UserGagePage>>(null);
  public currentPageSubject = new BehaviorSubject<number>(0);
  public currentPage$ = this.currentPageSubject.asObservable();

  constructor(private storageService: StorageService,
              private http: HttpClient,
              private gagaDataService: GageDataService,
              private excelService: ExcelService,
              private modalService: NgbModal) { }


  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    console.log("this.isLoggedIn", this.isLoggedIn);

    if (this.isLoggedIn) {
      // @ts-ignore
      this.gageDateState$ = this.gagaDataService.gageData$().pipe(
        map((response: ApiResponse<UserGagePage>) => {
          this.responseSubject.next(response);
          this.currentPageSubject.next(response.data.page.number);
          console.log("gageDateSate$ result: ", response);
          return ({appState: 'APP_LOADED', appData: response});
        }),
        startWith({appState: 'APP_LOADING'}),
        catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
      );
    }
  }

  goToPage(contractNumber?: string, serialNumber?: string, pageNumber: number = 0): void {
    // @ts-ignore
    this.gageDateState$ = this.gagaDataService.gageData$(contractNumber, serialNumber, pageNumber).pipe(
      map((response: ApiResponse<UserGagePage>) => {
        this.responseSubject.next(response);
        this.currentPageSubject.next(pageNumber);
        console.log("gageDateSate$: ", response);
        return ({appState: 'APP_LOADED', appData: response});
      }),
      startWith({appState: 'APP_LOADED', appData: this.responseSubject.value}),
      catchError((error: HttpErrorResponse) => of({appState: 'APP_ERROR', error}))
    );
  }

  goToPreviousOrNextPage(direction?: string, contractNumber?: string, serialNumber?: string): void {
    this.goToPage(contractNumber, serialNumber, direction === 'forward'
      ? this.currentPageSubject.value + 1
      : this.currentPageSubject.value - 1);
  }

  exportExcel() {
    this.gagaDataService.getGageDataForExportToExcel().subscribe(
      data => {
        this.excelService.exportGageDataToExcel(data);
      }
    );
  }
}
