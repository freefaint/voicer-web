import React from 'react';

import MuiTabs from '@material-ui/core/Tabs';
import MuiTab from '@material-ui/core/Tab';
import { Tab } from 'types/registry/schema';
import { useCallback } from 'react';
import { withStyles } from '@material-ui/core';

const StyledTabs = withStyles({
  root: {
    padding: "0 1.5rem",
    borderBottom: "0.0625rem solid rgba(0,0,0,0.12)",
  }
})(MuiTabs);

const StyledTab = withStyles({
  root: {
    fontWeight: "bold"
  }
})(MuiTab);

interface TabsProps<T> {
  name?: string;
  tabs: Tab<T>[];
  item: T;
  onChange: (tab?: string) => void;
}

export function Tabs<T>({ name, item, tabs, onChange} : TabsProps<T>) {
  const handleChange = useCallback((event: React.ChangeEvent<{}>, newValue: number) => {
    onChange(tabs.indexOf(tabs[newValue]) === 0 ? undefined : tabs[newValue].name);
  }, [tabs, onChange]);

  return (
    <StyledTabs
      value={name ? tabs.indexOf(tabs.find(i => i.name === name)!) : 0}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleChange}
      aria-label="disabled tabs example"
    >
      {tabs.map(tab => !tab.hide?.(item) && (
        <StyledTab key={tab.name} label={tab.label} />
      ))}
    </StyledTabs>
  );
}
