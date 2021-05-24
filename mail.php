<?

$postData = file_get_contents('php://input');
$data = json_decode($postData, true);

print_r($data);

$html = '<table>';

foreach ($data["data"] as $key => $item) {
  $html .= '<tr><td>' . $item["product"]["name"] . '</td><td>' . $item["count"] . ' шт</td><td>' . $item["product"]["cost"] . '</td></tr>';
}

$html .= '<tr><td colspan="3">' . $data["total"] . ' руб</td></tr></table>';

echo $html;

// mail ( "f-saint@yandex.ru", "Заказ № " . $data["order"], $html);
// mail ( "info@be-at.ru", "Заказ № " . $data["order"], $html);
// mail ( "amnezium@ya.ru", "Заказ № " . $data["order"], $html);

echo "ok";

?>