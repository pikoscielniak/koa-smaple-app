"use strict";

import { ProjectCtrl } from './ProjectCtrl';
import { ProjectService } from './ProjectService';

let ctrl = ProjectCtrl;
let service = ProjectService.factory;

export { service }
export { ctrl }