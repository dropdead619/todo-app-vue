
import BaseCheckbox from '@/components/UI/BaseCheckbox.vue';
import BaseInput from '@/components/UI/BaseInput.vue';
import BaseBackdrop from '@/components/UI/BaseBackdrop.vue';
import BasePreloader from '@/components/UI/BasePreloader.vue';
import BaseButton from '@/components/UI/BaseButton.vue';
import BaseCard from '@/components/UI/BaseCard.vue';
import BaseDialog from '@/components/UI/BaseDialog.vue';
import BaseModal from '@/components/UI/BaseModal.vue';
import BaseTextarea from '@/components/UI/BaseTextarea.vue';

export function registerGlobalComponents(app) {
  app.component('BaseCheckbox', BaseCheckbox);
  app.component('BaseInput', BaseInput);
  app.component('BaseBackdrop', BaseBackdrop);
  app.component('BaseDialog', BaseDialog);
  app.component('BasePreloader', BasePreloader);
  app.component('BaseButton', BaseButton);
  app.component('BaseCard', BaseCard);
  app.component('BaseModal', BaseModal);
  app.component('BaseTextarea', BaseTextarea);
}
