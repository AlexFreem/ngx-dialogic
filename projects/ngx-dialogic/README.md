# ngx-dialogic

Dialog box for your Angular 6 application with additional logic.

Allows you to:
Use the resolver to retrieve data
Use the component as the contents of the dialog box
Send and receive data using @Input and @Output

## Demo

Clone this repo, install dependencies and run

`npm run start`

## Installation

`npm install ngx-dialogic --save`

## Simple Usage

- Create a component that you plan to display in the dialog box. For example with name `InmodalComponent`
- Include `NgxDialogicModule` to `imports` section of your root module
- Include `InmodalComponent` to `entryComponents` section of your root module

```typescript
import { NgModule } from '@angular/core';
import { NgxDialogicModule } from 'ngx-dialogic';

import { InmodalComponent } from './inmodal.component';

@NgModule({
  // ...
  imports: [
    NgxDialogicModule
  ],
  entryComponents: [
    InmodalComponent
  ]
})
export class AppModule { }
```

- Inject `NgxDial0gicService` in some application component and use method `show` with `InmodalComponent` as argument

```typescript
import { Component } from '@angular/core';
import { NgxDialogicService } from 'ngx-dialogic';

import { InmodalComponent } from './inmodal.component';

@Component({
  // ...
})
export class AppComponent {
  constructor(private dialog: NgxDialogicService) {
    this.dialog.show(InmodalComponent);
  }
}
```

## Resolve data, pass data to component as @Input and @Output, close by click on overlay, vertical alignment

Method `show` can be used with optional parameter `config`

```typescript
this.dialog.show(
  InmodalComponent,
  {
    resolve: {
      userData: UserDataResolve
    },
    data: {
      sampleInput: 'Any value',
      callbackHandler: (callbackArg) => { }
    },
    options: {
      isTopAligned: true,
      closeOnOverlay: true
    }
  }
);
```

- `resolve` - Object with values of type [Resolve](https://angular.io/api/router/Resolve). Resolved data can be injected to modal component via `MODAL_DATA_TOKEN`
- `data` - Object with values for `@Input` and `@Output`

```typescript
import { Component, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MODAL_DATA_TOKEN, NgxDialogicService } from 'ngx-dialogic';

@Component({
  // ...
})
export class InmodalComponent {
  
  @Input() sampleInput;
  @Output() callbackHandler = new EventEmitter<boolean>();
  
  constructor(
    @Inject(MODAL_DATA_TOKEN) private resolvedData,
    private dialog: NgxDialogicService
  ) { }
  
  clickHandler () {
    this.callbackHandler.emit(true);
    this.dialog.hide(); // Closes currently open dialog
  }
}
```

- `options` - `closeOnOverlay` - closes dialog box by click on overlay. `isTopAligned` - appends additional class for display component with large content.
