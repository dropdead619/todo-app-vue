
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseModal from '@/components/UI/BaseModal';
import BasePreloader from '@/components/UI/BasePreloader';
import BaseButton from '@/components/UI/BaseButton';

export function registerGlobalComponents(app) {
  app.component('BaseCheckbox', BaseCheckbox);
  app.component('BaseInput', BaseInput);
  app.component('BaseModal', BaseModal);
  app.component('BasePreloader', BasePreloader);
  app.component('BaseButton', BaseButton);
}
