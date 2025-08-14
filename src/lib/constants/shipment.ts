export type Option = { value: string; label: string };
export type Province = { id: string; name: string };
export type Group = {
  id: string;
  name: string;
  province: string; // province value
  localityValues: string[]; // option values
};

export type Rule = {
  id: string;
  shippingType: string; // value
  province: string; // value
  allLocalities: boolean;
  localityValues: string[]; // option values
  carrier: string; // value
  groupName?: string; // optional, for display if user applied a whole group
};
