import 'jest-preset-angular/setup-jest'
import { addIcons } from 'ionicons'
import {
  logoApple,
  logoGoogle,
  logoGithub,
  closeCircle,
  settingsOutline,
  optionsOutline,
  logOutOutline,
  homeOutline,
  layersOutline,
  listOutline,
  addOutline,
  folderOutline,
  closeCircleOutline,
  checkmarkCircleOutline,
  menu,
  close,
  add,
  addCircleSharp,
  addCircleOutline
} from 'ionicons/icons'

addIcons({
  menu,
  close,
  add,
  'add-circle-sharp': addCircleSharp,
  'add-circle-outline': addCircleOutline,
  'logo-apple': logoApple,
  'logo-google': logoGoogle,
  'logo-github': logoGithub,
  'settings-outline': settingsOutline,
  'options-outline': optionsOutline,
  'log-out-outline': logOutOutline,
  'home-outline': homeOutline,
  'layers-outline': layersOutline,
  'list-outline': listOutline,
  'add-outline': addOutline,
  'folder-outline': folderOutline,
  'close-circle': closeCircle,
  'close-circle-outline': closeCircleOutline,
  'checkmark-circle-outline': checkmarkCircleOutline
})
