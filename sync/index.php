<?php
$notes = json_decode(file_get_contents('notes.json'));

header('Content-Type => application/json');

function get_params() {
  $uri = explode('/', ltrim($_SERVER['REQUEST_URI'], '/'));
  $request = new stdClass();
  for ($i = 0; $i < count($uri); $i += 2) {
    if (!array_key_exists($i, $uri)) break;
    $key = $uri[$i];
    if (empty($key)) break;

    if (array_key_exists($i + 1, $uri)) {
      $val = $uri[$i + 1];
    } else {
      $val = null;
    }

    $request->$key = $val;
  }
  return $request;
}

function get_request() {
  static $input = null;
  if (null === $input) {
    $input = file_get_contents('php://input');
  }
  return (array) json_decode($input);
}

function get_note($notes, $id) {
  $id = (int) $id;
  foreach ($notes as $note) {
    if ($note->id === $id) {
      return json_encode($note);
    }
  }
  return null;
}

$params = get_params();
$request = get_request();

switch (strtoupper($_SERVER['REQUEST_METHOD'])) {
  case 'GET':
    if (!isset($params->note)) {
      echo json_encode($notes);
      exit;
    }
    echo get_note($notes, $params->note);
    break;
  case 'POST':
    echo get_note($notes, $params->note);
    break;
  case 'PUT':
    echo get_note($notes, $params->note);
    break;
  case 'DELETE':
    # code...
    break;

  default:
    # code...
    break;
}
// $note['id'] = 10;
// echo json_encode($note);