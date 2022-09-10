import { store } from 'quasar/wrappers';
import Vuex from 'vuex';

import { EmployeeStateInterface } from './employee-module/state';
import employee from './employee-module';
import { DocumentStateInterface } from './document-module/state';
import document from './document-module';
import { ContentStateInterface } from './content-module/state';
import content from './content-module';
import { ReportStateInterface } from './report-module/state';
import report from './report-module';
import { UiNavStateInterface } from './ui-navigation-module/state';
import uiNav from './ui-navigation-module';
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  employee: EmployeeStateInterface;
  document: DocumentStateInterface;
  content: ContentStateInterface;
  report: ReportStateInterface;
  uiNav: UiNavStateInterface;
}

export default store(function({ Vue }) {
  Vue.use(Vuex);

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      document,
      employee,
      content,
      report,
      uiNav
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING
  });

  return Store;
});
