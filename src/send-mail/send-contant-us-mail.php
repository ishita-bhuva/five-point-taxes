<?php
// include('./dbconnect.php');

require("PHPMailer/src/PHPMailer.php");
require("PHPMailer/src/SMTP.php");
require("PHPMailer/src/Exception.php");

$mail = new PHPMailer\PHPMailer\PHPMailer(true);

$titlename = trim($_POST["titlename"]);
$fname = trim($_POST["fname"]);
$lname = trim($_POST["lname"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$message = trim($_POST["message"]);
$subject = trim($_POST["subject"]);
$siteName = trim($_POST["siteName"]);

$message = str_replace("\\r\\n", ' ', $message);

if (!$fname || !$lname || !$phone  || !$email || !$message) {
  $response = [
    'message' => 'All fields are required!',
    'status' => "error",
  ];
  header('Content-Type: application/json');
  echo json_encode($response);
  exit;
}

$body = file_get_contents('mail-template/contact-us-email.html');
$body = str_replace('%titlename%', $titlename, $body);
$body = str_replace('%fname%', $fname, $body);
$body = str_replace('%lname%', $lname, $body);
$body = str_replace('%email%', $email, $body);
$body = str_replace('%phone%', $phone, $body);
$body = str_replace('%subject%', $subject, $body);
$body = str_replace('%message%', $message, $body);
$body = str_replace('%from%', $siteName, $body);


// host
$host = 'tls://smtp.gmail.com:587';
$port = 587;

// authentication

$firstRecipientUsername = "pooja@logisticinfotech.co.in";
// $secondRecipientUsername = "jeff.horvath@digipli.com";
// $thirdRecipientUsername = "jeffrey.ruiz@digipli.com";
$authUsername = "dev.jeremy.ahc@gmail.com";
$authPassword = "jeremy5000";
$senderName = 'jeremy';


// recipient

// email
$mailsubject = $siteName;

try {
  // $mail->SMTPDebug = 0;
  $mail->isSMTP();
  $mail->Host       = $host;
  $mail->SMTPAuth   = true;
  $mail->Username   = $authUsername;
  $mail->Password   = $authPassword;
  $mail->SMTPSecure = "tls";

  $mail->setFrom($authUsername, $senderName);

  $mail->addAddress($firstRecipientUsername);
  // $mail->addAddress($secondRecipientUsername);
  // $mail->addAddress($thirdRecipientUsername);

  // Content
  $mail->isHTML(true);
  $mail->Subject = $mailsubject;
  $mail->Body    = $body;
  $mail->send();


  $response = [
    'message' => 'Message has been sent',
    'status' => "success",
  ];
  header('Content-Type: application/json');
  echo json_encode($response);
  exit;
} catch (Exception $e) {
  echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
  echo '$e' . $e;
  $response = [
    'message' => 'Email could not be sent.'.$mail->ErrorInfo,
    'status' => "error",
    'error' => $e
  ];
  header('Content-Type: application/json');
  echo json_encode($response);
}
