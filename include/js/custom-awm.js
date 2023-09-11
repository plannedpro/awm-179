let soundHello,soundWelcome,soundHelloWelcome;
function playSoundWelcome(){
    soundHello = byId(`sound-hello`);
    soundWelcome = byId(`sound-welcome`);
    soundHelloWelcome = byId(`sound-hello_welcome`);
    soundHelloWelcome.play();
   
}


function btnclickCkeckIn(){
    let value = byId('input_checkin').value;
    if(value.length>=2){
        checkInAWM(value)
    }
    
}
function readyInputCheckIn(){
    // console.log(moment().format('YYYY-MM-DD HH:mm:s'));
    $('#input_checkin').focus();
    $('#input_checkin').keypress(function(event){
        var keycode = (event.keyCode ? event.keyCode : event.which);
        let value = this.value;
        if(keycode == '13' && value.length>=2){
            checkInAWM(value)
        //   alert('You pressed a "enter" key in textbox');  
        }
    });
    getDataGraphAndUserCheckIn();
}
function checkInAWM(id){
    // playSoundWelcome();
    let txt = byId('showTextHelloWelcome');
    
    let dataAPI = {
        sid:id
    }
    console.log(dataAPI);
    connectApi('checkin/scan', { type: 'checkin', data: dataAPI, dataoption: 0 }, '', function(output) {
        console.log(output)
        if(output.status==200){
            byId(`sound-hello_welcome`).play();
            txt.innerHTML= `<div class="txt completed" id="showTxTResultScan">
            <div><img src="${BASEPATH}include/img/icon/reception.gif" width="120px"></div>
            บันทึกเข้าสำเร็จ</div>`;
          
        }else{
            byId(`sound-notfound`).play();
            txt.innerHTML= `<div class="txt notfound" id="showTxTResultScan">
            <div><img src="${BASEPATH}include/img/icon/barcode-read.gif" width="100px"></div>
            ไม่พบข้อมูล<br><small>โปรดแสกน หรือลองใหม่อีกครั้ง</small></div>`;
        }
        setTimeout(() => { 
            byId('showTxTResultScan').style.opacity =1;
            byId('showTxTResultScan').style.height ='11rem';
         }, 100);
        setTimeout(() => {
            byId('input_checkin').value ='';
            byId('showTxTResultScan').style.height =0;
            byId('showTxTResultScan').style.opacity =0;        
        }, 3000);
        getDataGraphAndUserCheckIn();
    })

}

function getDataGraphAndUserCheckIn(){
    let numDay = 30;
    if(mobileAndTabletCheck()){
        numDay=14;
    }
    let FILTER_START = moment().subtract(numDay, 'day').startOf('day').format('YYYY-MM-DD H:mm:s');
    let FILTER_END = moment().endOf('day').format('YYYY-MM-DD H:mm:s');
    let dataAPI = {
        start:FILTER_START,
        end:FILTER_END
    }
    console.log(dataAPI);
    connectApi('checkin/scan', { type: 'last30AndToday', data: dataAPI, dataoption: 0 }, '', function(output) {
        console.log(output)
        if(output.status==200){
            let last30 = output.data[0].last30;
            createGraphCheckInLast30(last30,dataAPI);

        }
    });
}

let boxGraphCheckInLast30;
function createGraphCheckInLast30(data,dataAPI){
    let arrLastMonth = [];
    let arrLastMonth_temp = [];
    let arrInprocess = [];
    let arrCompleted = [];
    let durationDay = days_between(new Date(dataAPI.start),new Date(dataAPI.end));
   //console.log(durationDay);
    for(let i=0;i<durationDay;i++){
      arrLastMonth.push(moment(dataAPI.start).add(i, 'days').startOf('day').format('Do MMM'))
      arrLastMonth_temp.push(moment(dataAPI.start).endOf('day').add(i, 'days').format('YYYY-MM-DD'))
      arrInprocess.push(0)
    }
    ////console.log(data);
    let countToday =0;
    data.forEach(log => {
        let count = 0;
        arrLastMonth_temp.forEach(day=>{
            if(log.DD==day){
                arrInprocess[count] = log.num;
                if(moment().format('YYYY-MM-DD')==day){
                    countToday+=log.num;
                }
            }
            
            count++;
        })
    })

    byId('numuserCheckInToday').innerHTML = addCommas(countToday);
   //console.log(arrLastMonth_temp,arrInprocess)
    var options = {
        series: [ {
                name: `ผู้ใช้บริการ`,
                data: arrInprocess
            }],
        chart: {
            height: 250,
            type: 'area', // bar line 
              toolbar: {
                show: false
              }, zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
              },
              toolbar: {
                autoSelected: 'zoom'
              }
        },
       

        stroke: {
          curve: 'smooth'
        },
        dataLabels: {
            enabled: true,
            style: {
                fontSize: '8px',
                colors: ["#6f309e","#ffffff"]
            }
        },
        xaxis: {
            categories: arrLastMonth,
            type: 'category', // category , datetime
            position: 'bottom',
            // tickAmount: 30,
            tickPlacement: 'between',
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#6f309e',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
            labels: {
                datetimeFormatter: {
                  year: 'yyyy',
                  month: 'MMM \'yy',
                  day: 'dd MMM',
                  hour: 'HH:mm'
                }
              },
            tooltip: {
                enabled: false,
            }
        },
        yaxis: {
            // title: {
            //     text: 'Create New Ticket'
            //   },
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function(val) {
                    return `${addCommas(parseFloat(val).toFixed(0))} คน`;
                }
            }
        },
        title: {
            text: `สถิติการเข้าใช้บริการห้องสมุด`,
            floating: true,
            offsetY: 0,
            align: 'left',
            style: {
                fontFamily:  'Noto Sans Thai',
                color: '#444'
            }
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          markers: {
            size: 1
          },
        opposite: true,
        subtitle: {
            text: `ในช่วง ${moment(dataAPI.start).format('DD MMM YYYY')} ถึง ${moment(dataAPI.end).format('DD MMM YYYY')}`,
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 15,
            floating: false,
            style: {
              fontSize:  '12px',
              fontWeight:  'normal',
              fontFamily:  'Noto Sans Thai',
              color:  '#9699a2'
            },
        },
          fill: {
            opacity: 1
          }
          ,colors:[ '#6f309e','#26a0fc', '#3591D0','#BCBCBC']
    };

    boxGraphCheckInLast30?boxGraphCheckInLast30.destroy():null;

    boxGraphCheckInLast30 = new ApexCharts(Find("#boxGraphCheckInLast30"), options);
    boxGraphCheckInLast30.render();
    boxGraphCheckInLast30.updateSeries([{
     
    }])
   //console.log('Completed');

   
}