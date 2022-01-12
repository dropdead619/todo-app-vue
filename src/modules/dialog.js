import { ref } from 'vue';

export default function useDialog() {
  const show = ref(false);

  function onOk(cb) {
    cb();
  }

  function onReject() {
    console.log('OnRec', show.value);
    show.value = !show.value;
  }

  return { show, onOk, onReject };
}
