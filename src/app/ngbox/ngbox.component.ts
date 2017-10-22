import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, HostListener, DoCheck } from '@angular/core';
import { NgBoxService } from './ngbox.service';


@Component({
    selector: 'my-ngbox, ngbox',
    template: `
    <div id="ngBoxOverlay" *ngIf="ngBox.open"></div>
        <div id="ngBoxLoading" *ngIf="ngBox.loading"><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNv
ZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+PHN2ZyB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxucz0iaHR0cD
ovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjAiIHdpZHRo
PSIxNjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMTI4IDE2IiB4bWw6c3BhY2U9InByZXNlcnZlIj48c2NyaXB0IHR5cGU9InRleHQvZW
NtYXNjcmlwdCIgeGxpbms6aHJlZj0iLy9wcmVsb2FkZXJzLm5ldC9qc2NyaXB0cy9zbWlsLnVzZXIuanMiLz48cGF0aCBmaWxsPSIjZmZmZmZmIiBm
aWxsLW9wYWNpdHk9IjAuNDE5NjA3ODQzMTM3MjUiIGQ9Ik02LjQsNC44QTMuMiwzLjIsMCwxLDEsMy4yLDgsMy4yLDMuMiwwLDAsMSw2LjQsNC44Wm
0xMi44LDBBMy4yLDMuMiwwLDEsMSwxNiw4LDMuMiwzLjIsMCwwLDEsMTkuMiw0LjhaTTMyLDQuOEEzLjIsMy4yLDAsMSwxLDI4LjgsOCwzLjIsMy4y
LDAsMCwxLDMyLDQuOFptMTIuOCwwQTMuMiwzLjIsMCwxLDEsNDEuNiw4LDMuMiwzLjIsMCwwLDEsNDQuOCw0LjhabTEyLjgsMEEzLjIsMy4yLDAsMS
wxLDU0LjQsOCwzLjIsMy4yLDAsMCwxLDU3LjYsNC44Wm0xMi44LDBBMy4yLDMuMiwwLDEsMSw2Ny4yLDgsMy4yLDMuMiwwLDAsMSw3MC40LDQuOFpt
MTIuOCwwQTMuMiwzLjIsMCwxLDEsODAsOCwzLjIsMy4yLDAsMCwxLDgzLjIsNC44Wk05Niw0LjhBMy4yLDMuMiwwLDEsMSw5Mi44LDgsMy4yLDMuMi
wwLDAsMSw5Niw0LjhabTEyLjgsMEEzLjIsMy4yLDAsMSwxLDEwNS42LDgsMy4yLDMuMiwwLDAsMSwxMDguOCw0LjhabTEyLjgsMEEzLjIsMy4yLDAs
MSwxLDExOC40LDgsMy4yLDMuMiwwLDAsMSwxMjEuNiw0LjhaIi8+PGc+PHBhdGggZmlsbD0iI2ZmZmZmZiIgZmlsbC1vcGFjaXR5PSIxIiBkPSJNLT
QyLjcsMy44NEE0LjE2LDQuMTYsMCwwLDEtMzguNTQsOGE0LjE2LDQuMTYsMCwwLDEtNC4xNiw0LjE2QTQuMTYsNC4xNiwwLDAsMS00Ni44Niw4LDQu
MTYsNC4xNiwwLDAsMS00Mi43LDMuODRabTEyLjgtLjY0QTQuOCw0LjgsMCwwLDEtMjUuMSw4YTQuOCw0LjgsMCwwLDEtNC44LDQuOEE0LjgsNC44LD
AsMCwxLTM0LjcsOCw0LjgsNC44LDAsMCwxLTI5LjksMy4yWm0xMi44LS42NEE1LjQ0LDUuNDQsMCwwLDEtMTEuNjYsOGE1LjQ0LDUuNDQsMCwwLDEt
NS40NCw1LjQ0QTUuNDQsNS40NCwwLDAsMS0yMi41NCw4LDUuNDQsNS40NCwwLDAsMS0xNy4xLDIuNTZaIi8+PGFuaW1hdGVUcmFuc2Zvcm0gYXR0cm
lidXRlTmFtZT0idHJhbnNmb3JtIiB0eXBlPSJ0cmFuc2xhdGUiIHZhbHVlcz0iMjMgMDszNiAwOzQ5IDA7NjIgMDs3NC41IDA7ODcuNSAwOzEwMCAw
OzExMyAwOzEyNS41IDA7MTM4LjUgMDsxNTEuNSAwOzE2NC41IDA7MTc4IDAiIGNhbGNNb2RlPSJkaXNjcmV0ZSIgZHVyPSI3ODBtcyIgcmVwZWF0Q2
91bnQ9ImluZGVmaW5pdGUiLz48L2c+PC9zdmc+Cg=="/></div>
        <div id="ngBoxWrapper" (click)="closeOutside($event)" *ngIf="ngBox.open" [ngStyle]="{'padding-top': offsetHeight+'px'}">
            <div id="ngBoxContent">
                <img *ngIf="getHasGroup()" class="left" (click)="previousNgBox()" src="/public/icons/left@2x.png">
                <img *ngIf="getHasGroup()" class="right" (click)="nextNgBox()" src="/public/icons/right@2x.png">
                <img id="ngBoxImage" *ngIf="ngBox.current.type == 1"
                     (load)="isLoaded()"
                     #ngBoxContent
                     [src]="ngBox.current.url"
                     [hidden]="ngBox.loading"
                     (click)="nextNgBox()"
                     alt="">
            <p id="ngBoxPages">
                <span class="pages" *ngIf="getHasGroup()">{{getCurrentIndex()}} / {{getCount()}}</span>
            </p>
            </div>
            <div #ngBoxButtons id="buttons" [hidden]="ngBox.loading">
                <img (click)="closeNgBox()" id="closeButton" src="/public/icons/close@2x.png" alt="">
            </div>

        </div>
    `,
    styles: [`

        #ngBoxOverlay{
            position: absolute;
            height: 100%;
            width: 100%;
            background-color: black;
            opacity: 0.6
        }
        #ngBoxLoading{
            text-align: center;
            z-index: 10001;
            width: 100%;
            height: 100%;
            color: white;
            position: fixed;
            top: 46%;
            font-size: 20px;
        }
        #ngBoxImage {
            max-height: 500px;
            max-width: 666px;
        }
        #ngBoxWrapper {
            display: inline-block;
            text-align: center;
            z-index: 10000;
            position: fixed;
            height: 100%;
            width: 100%;
        }
        #ngBoxPages{
            display: inline-block;
            vertical-align: top;
            color: white;
            position: absolute;
            top: 18px;
            right: 18px;
            font-size: 14px;
            line-height: 17px;
        }
        #ngBoxContent {
            position: fixed;
            display: block;
            background-color: black;
            top: 50%;
            left: 50%;
            height: 500px;
            width: 840px;
            margin-top: -250px;
            margin-left: -420px;
        }
        button {
            font-size: 12px;
        }

        iframe {
            max-width: 100%;
            max-height: 100%;
        }
        #buttons{
            position: relative;
            margin: 5px auto;
            text-align: right;
        }
        #buttons p{
            float: left;
            color: white;
            text-align: left;
            margin: 0 50px 0 0;
            font-size: 12px;
            font-family: sans-serif;
        }
        #buttons span.title{
            display: block;
            height: 18px;
            overflow: hidden;
        }
        #closeButton{
            position: absolute;
            top: 50px;
            right: 50px;
            height: 26px;
            width: 26px;
            cursor: pointer;
        }
        .left{
            position: absolute;
            left: -75px;
            margin-top: -19px;
            cursor: pointer;
            top: 50%;
            height: 38px;
            width: 24px;
        }
        .right{
            position: absolute;
            right: -75px;
            margin-top: -19px;
            cursor: pointer;
            top: 50%;
            height: 38px;
            width: 24px;
        }

       @media screen and (max-width: 1024px) {
          .left{
            left: 10px; !important
          }
          .right{
            right: 10px; !important
          }
          #ngBoxContent{
                background-color: black;
                height: 80%;
                position: absolute;
                top: 10%;
                left: 0;
                width: 100%;
                display: table-cell;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 0px;
                margin-left: 0px;
            }

            #ngBoxImage{
                max-height: 100%;
                max-width: 100%;
            }

            #ngBoxWrapper {
                display: flex;
                z-index: 10000;
                position: absolute;
                height: 100%;
                width: 100%;
                justify-content: center;
                align-items: center;
                text-align: center;
            }

            .left {
                position: absolute;
                left: 10px !important;
                /* margin-top: -19px; */
                cursor: pointer;
                top: 50%;
                height: 38px;
                width: 24px;
            }
            .right {
                position: absolute;
                right: 10px !important;
                margin-top: -19px;
                cursor: pointer;
                top: 50%;
                height: 38px;
                width: 24px;
            }
            #closeButton{
                position: fixed;
                top: 24px;
                right: 15px;
                height: 15px;
                width: 15px;
                cursor: pointer;
            }

        }

    `]
})
export class NgBoxComponent implements DoCheck {

    offsetHeight: number;
    interval: any;
    @Input() data: any;
    @Output() showMore = new EventEmitter();
    @ViewChild('ngBoxContent') elementView: ElementRef;
    @ViewChild('ngBoxButtons') elementButtons: ElementRef;

    constructor(
        public ngBox: NgBoxService
    ) {
    }

    ngDoCheck() {
        if (this.ngBox.open === true && this.elementView === undefined) {
            this.checkInterval();
        }
    }

    closeOutside($event) {
        if ($event.target.getAttribute('id') === 'ngBoxContent' || $event.target.getAttribute('id') === 'ngBoxWrapper') {
            this.closeNgBox();
        }
    }

    checkInterval() {
        let t = setInterval(() => {
            if (this.elementView && this.elementButtons  ) {
                // Stop Loading on frames
                if (this.ngBox.current.type === 2 || this.ngBox.current.type === 3 || this.ngBox.current.type === 4) {
                    this.ngBox.loading = false;
                }

                clearInterval(t);
            }
        }, 10);
    }

    closeNgBox() {
        this.ngBox.open = false;
    }

    elementExist() {
        if (this.elementView !== undefined) {
            return true;
        }
        return false;
    }



    @HostListener('window:keydown', ['$event'])
    checkKeyPress(event: KeyboardEvent) {
        if ( event.keyCode === 39 ) {
            this.nextNgBox();
        }else if ( event.keyCode === 37 ) {
            this.previousNgBox();
        }else if ( event.keyCode === 27 ) {
            this.closeNgBox();
        }
    }

    calcPercent(value, of) {
        if (value !== undefined && value.toString().search('%') >= 0) {
            return of * parseInt(value.toString(), 0) / 100;
        }
        return value;
    }

    getHasGroup() {
        return this.ngBox.current.group !== undefined;
    }

    getCount() {
        return this.ngBox.images.filter(image => image.group === this.ngBox.current.group).length;
    }

    getCurrentIndex() {
        let currentGroup = this.ngBox.images.filter(image => image.group === this.ngBox.current.group);
        return currentGroup.map(function (e) {
            return e.id;
        }).indexOf(this.ngBox.current.id) + 1;
    }

    nextNgBox() {
        if ( this.ngBox.current.group === undefined ) {
            return false;
        }
        this.ngBox.loading = true;
        let currentGroup = this.ngBox.images.filter(image => image.group === this.ngBox.current.group);
        let pos = currentGroup.map(function (e) {
            return e.id;
        }).indexOf(this.ngBox.current.id);
        if (pos >= currentGroup.length - 1) {
            this.ngBox.current = currentGroup[0];
        } else {
            this.ngBox.current = currentGroup[pos + 1];
        }
        this.checkInterval();
    }

    previousNgBox() {
        if ( this.ngBox.current.group === undefined ) {
            return false;
        }
        this.ngBox.loading = true;
        let currentGroup = this.ngBox.images.filter(image => image.group === this.ngBox.current.group);
        let pos = currentGroup.map(function (e) {
            return e.id;
        }).indexOf(this.ngBox.current.id);
        if (pos === 0) {
            pos = currentGroup.length;
        }
        this.ngBox.current = currentGroup[pos - 1];
        this.checkInterval();
    }

    isLoaded() {
        if (this.ngBox.current.type === 1) {
            this.ngBox.loading = false;
        }

        this.checkInterval();
    }

}
