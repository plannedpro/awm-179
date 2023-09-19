
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/js/bootstrap-multiselect.min.js" integrity="sha512-lxQ4VnKKW7foGFV6L9zlSe+6QppP9B2t+tMMaV4s4iqAv4iHIyXED7O+fke1VeLNaRdoVkVt8Hw/jmZ+XocsXQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/css/bootstrap-multiselect.css" integrity="sha512-tlP4yGOtHdxdeW9/VptIsVMLtgnObNNr07KlHzK4B5zVUuzJ+9KrF86B/a7PJnzxEggPAMzoV/eOipZd8wWpag==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/css/bootstrap-multiselect.min.css" integrity="sha512-fZNmykQ6RlCyzGl9he+ScLrlU0LWeaR6MO/Kq9lelfXOw54O63gizFMSD5fVgZvU1YfDIc6mxom5n60qJ1nCrQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-multiselect/1.1.2/js/bootstrap-multiselect.js" integrity="sha512-YwbKCcfMdqB6NYfdzp1NtNcopsG84SxP8Wxk0FgUyTvgtQe0tQRRnnFOwK3xfnZ2XYls+rCfBrD0L2EqmSD2sA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script> -->

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/css/bootstrap-select.min.css">

<!-- Latest compiled and minified JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap-select@1.13.14/dist/js/bootstrap-select.min.js"></script>



<script type="text/javascript">
$(window).ready(() => {
    getDataOrderByStatusType('<?=$_GET['token']?>')

    $(`#search-order`).keyup(function(event) {
        if (event.keyCode === 13) {
            getDataOrderByStatusType('<?=$_GET['token']?>')
        }
    })

    $(`#filter-date`).daterangepicker({
        opens: 'left',
        startDate: new Date(SELECT_FILTER_DATE_START_0),
        endDate: new Date(SELECT_FILTER_DATE_END_0),
        singleDatePicker: false,
        autoApply: true,
        drops: 'auto',
        "locale": {
            "format": "DD/MM/YYYY",
            "separator": " ถึง ",
            "applyLabel": "ตกลง",
            "cancelLabel": "ยกเลิก",
            "fromLabel": "จาก",
            "toLabel": "ถึง",
            "customRangeLabel": "เลือกช่วงเวลาเอง",
            "weekLabel": "W",
            "daysOfWeek": arrWeek,
            "monthNames": arrMonthThaiFull,
            "firstDay": 0
        }, ranges: {
            'วันนี้': [moment(), moment()],
            'สัปดาห์นี้': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
            'ช่วง 6 เดือน': [moment().subtract(6, 'month').startOf('month'), moment().endOf('month')],
            'ช่วง 3 เดือน': [moment().subtract(3, 'month').startOf('month'), moment().endOf('month')],
            'เดือนก่อน': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
            'เดือนนี้ ': [moment().startOf('month'), moment().endOf('month')],
            'ปีที่แล้ว': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
            'ปีนี้': [moment().startOf('year'), moment().endOf('year')]        
        },
    }, function(start,end){
        console.log(1)
        SELECT_FILTER_DATE_START_0 = moment(start).startOf('day').format('YYYY-MM-DD H:mm:s');
        SELECT_FILTER_DATE_END_0 = moment(end).endOf('day').format('YYYY-MM-DD H:mm:s');
        getDataOrderByStatusType('<?=$_GET['token']?>');
    });

    // $('#filterBrand254').multiselect();
    $('#filterBrand254').selectpicker();
    $('#filterBrand254').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        // do something...
        getDataOrderByStatusType('<?=$_GET['token']?>');
        });

    


});
</script>
<!-- <input type="hidden" id="selectTypeShow" value="<?=$typeId?>"> -->
<div class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-md-6">
                <h1 class="m-0 text-dark">ข้อมูลคำสั่งซื้อ </b></h1>
                <small>
                    อ้างอิง : <?=$_GET['token']?>
                </small>
            </div>
            <div class="col-md-12 text-right">
               
                <!-- <span onclick="AddDataAccountAdmin('add',0)" class="badge badge-pill badge-secondary cursor-pointer"><i class="fas fa-user-plus"></i> Add Account</span> -->

                <span onclick="getDataOrderByStatusType('<?=$_GET['token']?>')" class="badge badge-pill badge-secondary cursor-pointer"><i
                        class="fas fa-sync-alt"></i> รีเฟรชข้อมูล</span>
                <!-- <div class="ui mini icon input">
                  <input onkeyup='searchDataUsers()' id="search-user" type="text" placeholder="Search by id,name,phone,email"/>
                  <i aria-hidden="true" class="search icon"></i>
                </div> -->
                <?php  $dataBrand___ = getAllGroupDetailActiveByTypeAndGroup(4, 'ourbrand'); ?>
                <select class="selectpicker show-tick" multiple="multiple" id="filterBrand254" data-live-search="true" data-size="5" multiple data-actions-box="true">
<?php  foreach($dataBrand___ AS $g){ ?> <option selected value="<?=$g['blogs_id']?>"><?=$g['blogs_name']?></option>  <?php  } ?>
                </select>

                 <div class="ui icon input mini">
                    <input id="search-order" autocomplete="off" type="text" placeholder="Search..." />
                </div>
                <div class="ui  input mini">
                    <input id="filter-date" autocomplete="off" style="width:12.5rem" type="text" placeholder="Search..." />
                </div>
            </div>
        </div>
    </div>
</div>

<section class="content">
    <div class="container-fluid">
        <!-- <div id="table_account_admin" class=""></div> -->
        <div id="show-order" class=""></div>
    </div>
</section>


<style>
/*
I wanted to go with a mobile first approach, but it actually lead to more verbose CSS in this case, so I've gone web first. Can't always force things...

Side note: I know that this style of nesting in SASS doesn't result in the most performance efficient CSS code... but on the OCD/organizational side, I like it. So for CodePen purposes, CSS selector performance be damned.
*/
/* Global settings */
/* Global "table" column settings */
.product-image {
    float: left;
    width: 17%;
}

.product-details {
    float: left;
    width: 48%;
}

.product-price {
    float: left;
    width: 22%;
}

.product-quantity {
    float: left;
    width: 10%;
}

.product-removal {
    float: left;
    width: 9%;
}

.product-line-price {
    float: left;
    width: 12%;
    text-align: right;
}

/* This is used as the traditional .clearfix class */
.group:before,
.shopping-cart:before,
.column-labels:before,
.product:before,
.totals-item:before,
.group:after,
.shopping-cart:after,
.column-labels:after,
.product:after,
.totals-item:after {
    content: '';
    display: table;
}

.group:after,
.shopping-cart:after,
.column-labels:after,
.product:after,
.totals-item:after {
    clear: both;
}

.group,
.shopping-cart,
.column-labels,
.product,
.totals-item {
    zoom: 1;
}

/* Apply clearfix in a few places */
/* Apply dollar signs */
.product .product-price:before,
.product .product-line-price:before,
.totals-value:before {
    /* content: '$'; */
}

/* Body/Header stuff */
/* body {
  padding: 0px 30px 30px 20px;
  font-family: "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 100;
}

h1 {
  font-weight: 100;
}

label {
  color: #aaa;
}

.shopping-cart {
  margin-top: -45px;
} */

/* Column headers */
.column-labels label {
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #eee;
}

.column-labels .product-image,
.column-labels .product-details,
.column-labels .product-removal {
    text-indent: -9999px;
}

/* Product entries */
.product {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
}

.product .product-image {
    text-align: center;
}

.product .product-image img {
    width: 80px;
}

.product .product-details .product-title {
    margin-right: 20px;
    /* font-family: "HelveticaNeue-Medium", "Helvetica Neue Medium"; */
}

.product .product-details .product-description {
    margin: 0px 20px 5px 0;
    line-height: 1.4em;
    padding-top: .2rem;
    font-size: .9rem;
}

.product .product-quantity input {}

/* .product .remove-product {
  border: 0;
  padding: 4px 8px;
  background-color: #c66;
  color: #fff;
  font-family: "HelveticaNeue-Medium", "Helvetica Neue Medium";
  font-size: 12px;
  border-radius: 3px;
}
.product .remove-product:hover {
  background-color: #a44;
} */

/* Totals section */
.totals .totals-item {
    float: right;
    clear: both;
    width: 100%;
    /* margin-bottom: 10px; */
}

.totals .totals-item label {
    float: left;
    clear: both;
    width: 79%;
    text-align: right;
}

.totals .totals-item .totals-value {
    float: right;
    width: 21%;
    text-align: right;
}

.totals .totals-item-total {
    /* font-family: "HelveticaNeue-Medium", "Helvetica Neue Medium"; */
    font-weight: 700;
    font-size: 1.2rem;
}

.checkout {
    float: right;
    border: 0;
    margin-top: 20px;
    padding: 6px 40px;
    background-color: #1b64c6;
    color: #fff;
    font-size: 25px;
    border-radius: 5rem;
    transition: all .5s;

}

.checkout:hover {
    background-color: #494;
    transition: all .5s;

}

/* Make adjustments for tablet */
@media screen and (max-width: 650px) {
    .shopping-cart {
        margin: 0;
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .column-labels {
        display: none;
    }

    .product-image {
        float: right;
        width: auto;
    }

    .product-image img {
        margin: 0 0 10px 10px;
    }

    .product-details {
        float: none;
        margin-bottom: 10px;
        width: auto;
    }

    .product-price {
        clear: both;
        width: 70px;
    }

    .product-quantity {
        width: 100px;
        display: flex;
    }

    .product-quantity input {
        margin-left: 20px;
    }

    .product-quantity:before {
        content: 'x';
    }

    .product-removal {
        width: auto;
    }

    .product-line-price {
        float: right;
        width: 70px;
    }
}

/* Make more adjustments for phone */
@media screen and (max-width: 350px) {
    .product-removal {
        float: right;
    }

    .product-line-price {
        float: right;
        clear: left;
        width: auto;
        margin-top: 10px;
    }

    .product .product-line-price:before {
        content: 'Item Total: $';
    }

    .totals .totals-item label {
        width: 60%;
    }

    .totals .totals-item .totals-value {
        width: 40%;
    }
}


.timeline_custom {
    line-height: 1.4em;
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.timeline_custom h1,
.timeline_custom h2,
.timeline_custom h3,
.timeline_custom h4,
.timeline_custom h5,
.timeline_custom h6 {
    line-height: inherit;
}


/*----- timeline_custom ITEM -----*/

.timeline_custom-item {
    padding-left: 40px;
    position: relative;
}

.timeline_custom-item:last-child {
    padding-bottom: 0;
}


/*----- timeline_custom INFO -----*/

.timeline_custom-info {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1px;
    margin: 0 0 0.5em 0;
    text-transform: uppercase;
    white-space: nowrap;
}


/*----- timeline_custom MARKER -----*/

.timeline_custom-marker {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 15px;
}

.timeline_custom-marker:before {
    background: #007be4;
    border: 3px solid transparent;
    border-radius: 100%;
    content: "";
    display: block;
    height: 15px;
    position: absolute;
    top: 4px;
    left: 0;
    width: 15px;
    transition: background 0.3s ease-in-out, border 0.3s ease-in-out;
}

.timeline_custom-marker:after {
    content: "";
    width: 3px;
    background: #CCD5DB;
    display: block;
    position: absolute;
    top: 24px;
    bottom: 0;
    left: 6px;
}

.timeline_custom-item:last-child .timeline_custom-marker:after {
    content: none;
}

.timeline_custom-item:not(.period):hover .timeline_custom-marker:before {
    background: transparent;
    border: 3px solid #007be4;
}


/*----- timeline_custom CONTENT -----*/

.timeline_custom-content {
    padding-bottom: 40px;
}

.timeline_custom-content p:last-child {
    margin-bottom: 0;
    padding: 0;
}


/*----- timeline_custom PERIOD -----*/

.period {
    padding: 0;
}

.period .timeline_custom-info {
    display: none;
}

.period .timeline_custom-marker:before {
    background: transparent;
    content: "";
    width: 15px;
    height: auto;
    border: none;
    border-radius: 0;
    top: 0;
    bottom: 30px;
    position: absolute;
    border-top: 3px solid #CCD5DB;
    border-bottom: 3px solid #CCD5DB;
}

.period .timeline_custom-marker:after {
    content: "";
    height: 32px;
    top: auto;
}

.period .timeline_custom-content {
    padding: 19px 0 40px
}

.period .timeline_custom-title {
    margin: 0;
}


/*----------------------------------------------
      MOD: timeline_custom SPLIT
  ----------------------------------------------*/

@media (min-width: 768px) {
    .timeline_custom-split .timeline_custom,
    .timeline_custom-centered .timeline_custom {
        display: table;
    }
    .timeline_custom-split .timeline_custom-item,
    .timeline_custom-centered .timeline_custom-item {
        display: table-row;
        padding: 0;
    }
    .timeline_custom-split .timeline_custom-info,
    .timeline_custom-centered .timeline_custom-info,
    .timeline_custom-split .timeline_custom-marker,
    .timeline_custom-centered .timeline_custom-marker,
    .timeline_custom-split .timeline_custom-content,
    .timeline_custom-centered .timeline_custom-content,
    .timeline_custom-split .period .timeline_custom-info {
        display: table-cell;
        vertical-align: top;
    }
    .timeline_custom-split .timeline_custom-marker,
    .timeline_custom-centered .timeline_custom-marker {
        position: relative;
    }
    .timeline_custom-split .timeline_custom-content,
    .timeline_custom-centered .timeline_custom-content {
        padding-left: 30px;
    }
    .timeline_custom-split .timeline_custom-info,
    .timeline_custom-centered .timeline_custom-info {
        padding-right: 30px;
    }
    .timeline_custom-split .period .timeline_custom-title,
    .timeline_custom-centered .period .timeline_custom-title {
        position: relative;
        left: -45px;
    }
}


/*----------------------------------------------
      MOD: timeline_custom CENTERED
  ----------------------------------------------*/

@media (min-width: 992px) {
    .timeline_custom-centered,
    .timeline_custom-centered .timeline_custom-item,
    .timeline_custom-centered .timeline_custom-info,
    .timeline_custom-centered .timeline_custom-marker,
    .timeline_custom-centered .timeline_custom-content {
        display: block;
        margin: 0;
        padding: 0;
    }
    .timeline_custom-centered .timeline_custom-item {
        padding-bottom: 40px;
        overflow: hidden;
    }
    .timeline_custom-centered .timeline_custom-marker {
        position: absolute;
        left: 50%;
        margin-left: -7.5px;
    }
    .timeline_custom-centered .timeline_custom-info,
    .timeline_custom-centered .timeline_custom-content {
        width: 50%;
    }
    .timeline_custom-centered>.timeline_custom-item:nth-child(odd) .timeline_custom-info {
        float: left;
        text-align: right;
        padding-right: 30px;
    }
    .timeline_custom-centered>.timeline_custom-item:nth-child(odd) .timeline_custom-content {
        float: right;
        text-align: left;
        padding-left: 30px;
    }
    .timeline_custom-centered>.timeline_custom-item:nth-child(even) .timeline_custom-info {
        float: right;
        text-align: left;
        padding-left: 30px;
    }
    .timeline_custom-centered>.timeline_custom-item:nth-child(even) .timeline_custom-content {
        float: left;
        text-align: right;
        padding-right: 30px;
    }
    .timeline_custom-centered>.timeline_custom-item.period .timeline_custom-content {
        float: none;
        padding: 0;
        width: 100%;
        text-align: center;
    }
    .timeline_custom-centered .timeline_custom-item.period {
        padding: 50px 0 90px;
    }
    .timeline_custom-centered .period .timeline_custom-marker:after {
        height: 30px;
        bottom: 0;
        top: auto;
    }
    .timeline_custom-centered .period .timeline_custom-title {
        left: auto;
    }
}


/*----------------------------------------------
      MOD: MARKER OUTLINE
  ----------------------------------------------*/

.marker-outline .timeline_custom-marker:before {
    background: transparent;
    border-color: #FF6B6B;
}

.marker-outline .timeline_custom-item:hover .timeline_custom-marker:before {
    background: #FF6B6B;
}
</style>