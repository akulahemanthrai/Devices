import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {Router} from '@angular/router';
import { LoginComponent } from './login.component';
import { RouteGaurdService } from '../route-gaurd.service'
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ LoginComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture =  TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
     fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('component initial state', () => {
    expect(component.loginForm).toBeDefined();
    expect(component.authError.type).toBeFalsy();
    expect(component.authError.message).toBe("");
  }); 

  it('submitted should be true when submit the form', () => {
    let mockData = {
      email : "admin@gmail.com",
      password : "admin"
    }
    let signInStatus = component.signingIn(mockData);
     expect(signInStatus).toBeTruthy();
  });


});
