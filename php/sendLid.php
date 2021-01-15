<?php

/* https://api.telegram.org/bot777376257:AAHPxujxGkZrV1a3KFc8GQBWQ89Rf5pPlWM/getUpdates */


$token = '777376257:AAHPxujxGkZrV1a3KFc8GQBWQ89Rf5pPlWM';
$chat_id = '-276653820';

$message = array(
  'Имя: ' => $_POST['userName'],
  'Email: ' => $_POST['userEmail'],
  'Телефон: ' => $_POST['userTel'],
  'Сообщение: ' => $_POST['userMessage'],
);

foreach($message as $key => $value) {
  $txt .= "<b>".$key."</b> ".$value."%0A";
};

$sendToTelegram = fopen("https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&parse_mode=html&text={$txt}","r");

if ($sendToTelegram) {
  echo true;
} else {
  echo false;
}
?>
