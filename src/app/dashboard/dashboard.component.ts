import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';


// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

export interface DeviceInterface {
  device_id:string;
  serial_num:string;
  device_name:string;
  created_at:string;
  updated_at:string;
  last_contacted:string;
  isChecked? : Boolean;
  device_cap:[{
    feature : string;
    product_family?: string
  }];
}
const devices = {
  "total_results":49,
  "search_results":[
      {
          "device_id":"834ASDFASD9834",
          "serial_num":"00003434ASDFADF",
          "device_name":"ADennis_SLB",
          "created_at":"2019-11-06T21:28:18.071Z",
          "updated_at":"2019-12-06T22:42:16.649Z",
          "last_contacted":"2019-12-06T22:46:09.644Z",
          "device_cap":[
              {
                  "feature":"reboot",
                  "product_family":"SLB"
              },
              {
                  "feature":"shutdown",
                  "product_family":"SLC"
              },
              {
                  "feature":"firmware",
                  "product_family":"SLB"
              },
              {
                  "feature":"config",
                  "product_family":"SLB"
              }
          ]
      },
      {
          "device_id":"89837ASDF23",
          "serial_num":"ASDF98932AAS",
          "device_name":"EMG75_AK",
          "created_at":"2020-02-25T00:00:30.95Z",
          "updated_at":"2020-03-05T01:39:39.208Z",
          "last_contacted":"2020-03-05T01:39:59.159Z",
          "device_cap":[
              {
                  "feature":"reboot"
              },
              {
                  "feature":"shutdown",
                  "product_family":"SLB"
              },
              {
                  "feature":"firmware",
                  "product_family":"EMG7500"
              },
              {
                  "feature":"config",
                  "product_family":"EMG7500"
              }
          ]
      },
      {
          "device_id":"UJASDUF98798JASDF",
          "serial_num":"13445ASD323SS",
          "device_name":"SLC_4fb6",
          "created_at":"2020-03-19T08:14:56.04Z",
          "updated_at":"2020-03-19T08:14:56.04Z",
          "last_contacted":"2020-03-19T10:11:46.269Z",
          "device_cap":[
              {
                  "feature":"reboot",
                  "product_family":"SLC"
              },
              {
                  "feature":"shutdown",
                  "product_family":"SLC200"
              },
              {
                  "feature":"firmware",
                  "product_family":"SLB"
              },
              {
                  "feature":"config",
                  "product_family":"SLB"
              }
          ]
      },
      {
          "device_id":"00204AI75HE1XXFFAS",
          "serial_num":"JKDIUHD3AS",
          "device_name":"GlennSLC8000",
          "created_at":"2019-03-28T16:20:09.367Z",
          "updated_at":"2020-05-01T18:53:14.493Z",
          "last_contacted":"2020-05-01T19:52:43.556Z",
          "device_cap":[
              {
                  "feature":"reboot",
                  "product_family":"SLC200"
              },
              {
                  "feature":"shutdown",
                  "product_family":"SLC200"
              },
              {
                  "feature":"firmware",
                  "product_family":"SLC"
              },
              {
                  "feature":"config",
                  "product_family":"SLC"
              }
          ]
      },
      {
          "device_id":"00204AI75HE1XXAAAFFAS",
          "serial_num":"JKDIUAAAHD3AS",
          "device_name":"JOHNSLC8000",
          "created_at":"2019-03-28T16:20:09.367Z",
          "updated_at":"2020-05-01T18:53:14.493Z",
          "last_contacted":"2020-05-01T19:52:43.556Z",
          "device_cap":[
              {
                  "feature":"reboot",
                  "product_family":"SLC"
              },
              {
                  "feature":"shutdown",
                  "product_family":"SLB"
              },
              {
                  "feature":"firmware",
                  "product_family":"SLC200"
              },
              {
                  "feature":"config",
                  "product_family":"SLC"
              }
          ]
      }
  ]
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['select','Name', 'Status', 'Description', 'Serial Number'];
  dataSource = new MatTableDataSource(devices.search_results);

  deviceCap = {
    reboot : [],
    shutdown : [],
    firmware : [],
    config : []
  }
  commonDevices = [];
  ngOnInit () {
    this.dataSource.data.forEach((item:any) => item.isChecked = false)
  }
  constructDeviceCaps () {
    for(let cap in this.deviceCap){
      let isDeviceCap = this.deviceCap[cap].reduce((acc,item)=>{
         if(Object.keys(acc).length == 0)  {
           acc[item] = true;
            return acc;
         }
         if(acc[item])  return acc;
         acc[item] = true; return acc;
       },{})
      Object.keys(isDeviceCap).length ==1 ? this.commonDevices.push(cap) : ""
     }
  }
  //This function grows Linearly, Time complexinty O(n)
  checkeDevice(row) {
    row.isChecked = !row.isChecked;
    this.commonDevices = [];
    if(row.isChecked) {
      row.device_cap.forEach(item => this.deviceCap[item.feature].push(item.product_family) )
    } else {
      row.device_cap.forEach(item => {
        let indexOfDeviceCap = this.deviceCap[item.feature].indexOf(item.product_family)
        this.deviceCap[item.feature].splice(indexOfDeviceCap,1);
      }) 
    }
      //This Function will have fixed device capabiliteis Object called this.deviceCap. it doesn't grow linearly
     this.constructDeviceCaps()
  }

}
