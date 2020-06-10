import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ButtonCtaComponent } from './buttons/button-cta/button-cta.component'
import { ButtonComponent } from './buttons/button/button.component'

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonCtaComponent, ButtonComponent],
  exports: [ButtonCtaComponent, ButtonComponent],
})
export class KmbxMeatsModule {}
