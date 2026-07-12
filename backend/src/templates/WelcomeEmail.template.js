const WelcomeEmployeeTemplate = ({
  name,
  role,
  email,
  temporaryPassword,
}) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<title>Welcome to TransitOps</title>
</head>

<body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;background:#f4f7fb;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08);">

<!-- Header -->

<tr>
<td style="background:#1E40AF;padding:30px;text-align:center;color:white;">

<h1 style="margin:0;font-size:30px;">
🚛 TransitOps
</h1>

<p style="margin-top:8px;font-size:16px;">
Smart Transport Operations Platform
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:40px;">

<h2 style="margin-top:0;color:#222;">
Welcome, ${name} 👋
</h2>

<p style="font-size:16px;color:#555;line-height:28px;">
Your employee account has been successfully created in
<strong>TransitOps</strong>.
You can now access the system using the credentials below.
</p>

<table width="100%" cellpadding="12" cellspacing="0"
style="margin-top:30px;border-collapse:collapse;">

<tr style="background:#f3f4f6;">
<td><strong>Role</strong></td>
<td>${role}</td>
</tr>

<tr>
<td><strong>Email</strong></td>
<td>${email}</td>
</tr>

<tr style="background:#f3f4f6;">
<td><strong>Temporary Password</strong></td>
<td>${temporaryPassword}</td>
</tr>

</table>

<div style="text-align:center;margin:40px 0;">

<a href="http://localhost:5173/login"
style="
background:#1E40AF;
padding:15px 30px;
color:white;
text-decoration:none;
border-radius:8px;
font-weight:bold;
display:inline-block;
">
Login to TransitOps
</a>

</div>

<div style="
background:#FFF8E1;
padding:18px;
border-left:5px solid #F59E0B;
border-radius:6px;
">

<strong>Security Tip</strong>

<p style="margin:10px 0 0;color:#555;">
Please change your password immediately after your first login.
Do not share your credentials with anyone.
</p>

</div>

<p style="margin-top:35px;color:#555;line-height:28px;">
If you have any issues accessing your account,
please contact your Fleet Manager.
</p>

<p style="margin-top:30px;">
Regards,<br>
<b>TransitOps Team</b>
</p>

</td>
</tr>

<!-- Footer -->

<tr>

<td style="
background:#f3f4f6;
padding:20px;
text-align:center;
font-size:13px;
color:#777;
">

© ${new Date().getFullYear()} TransitOps.
All Rights Reserved.

</td>

</tr>

</table>

</td>
</tr>
</table>

</body>

</html>
`;
};

export default WelcomeEmployeeTemplate;