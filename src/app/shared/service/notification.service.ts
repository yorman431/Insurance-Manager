import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {NotificationToast} from '../interface/notification';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private $notification = new Subject<NotificationToast>()
  constructor() {
    this.$notification.subscribe({
      next: (notification) => Swal.fire(notification)
    })
  }

  success(titleText = 'Success') {
    this.$notification.next({
      titleText,
      icon: 'success',
      showConfirmButton: false,
      toast: true,
      timerProgressBar: true,
      timer: 4000,
      position: 'top-end',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }

  error(titleText = 'Error') {
    this.$notification.next({
      titleText,
      icon: 'error',
      showConfirmButton: false,
      toast: true,
      timerProgressBar: true,
      timer: 4000,
      position: 'top-end',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
  }

  warning(text: string, titleText = 'Warning') {
    this.$notification.next({
      titleText,
      text,
      icon: 'warning',
      toast: false,
      showConfirmButton: true
    })
  }
}
