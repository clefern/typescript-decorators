/// <reference types="@types/google.maps" />
import { User } from './User';
import { Company } from './Company';
import { CustomMap } from './CustomMap';
console.log('maps is running');

const map = new CustomMap('map');
map.addMarker(new User());
map.addMarker(new Company());
