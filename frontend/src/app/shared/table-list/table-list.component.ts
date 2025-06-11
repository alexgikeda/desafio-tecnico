import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, inject, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  standalone: false,
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss',
})
export class TableListComponent implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  public dataSource = new MatTableDataSource<any>();
  public displayedColumns: string[] = [];
  
  @Input() columns: { key: string,
                      type: string, 
                      header: string}[] = [];

  @Input() data: any[] = [];
  @Input() pageSizeOptions: number[] = [5, 10, 20];
  @Input() showActions: boolean = false;
  @Input() showView: boolean = false;
  @Input() showEdit: boolean = false;
  @Input() showDelete: boolean = false;

  @Input() onView?: (row: any) => void;
  @Input() onEdit?: (row: any) => void;
  @Input() onDelete?: (row: any) => void;  

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.displayedColumns = this.columns.map(c => c.key);
    if (this.showActions){
      this.displayedColumns.push('actions');
    }
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges() {
    this.dataSource.data = this.data;
  }  

  view(row: any) {
    this.onView?.(row);
  }

  edit(row: any) {
    this.onEdit?.(row);
  }

  delete(row: any) {
    this.onDelete?.(row);
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
