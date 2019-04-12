/* ============
 * Vue i18n
 * ============
 *
 * Internationalization plugin of Vue.js.
 *
 * https://kazupon.github.io/vue-i18n/
 */

import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from '@/locale/defaultMessages';
import numberFormats from '@/locale/numberFormats';

Vue.use(VueI18n);

const fallbackLocale = 'en';
const locale = 'en';

export const i18n = new VueI18n({
  locale,
  fallbackLocale,
  messages,
  numberFormats,
});

export default {
  i18n,
};
