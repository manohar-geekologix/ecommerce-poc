const nodemailer = require('nodemailer');

export async function POST(req) {
  const data = await req.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'nikhilverma.geekologix@gmail.com',
      pass: 'drru ooha oxlq sfid'
    }
  });

  try {
    const mailOptions = {
      from: 'nikhilverma.geekologix@gmail.com',
      to: data.email,
      subject: 'Invitation to join',
      html: `<p>Hello! You have been invited to join our team</p><p>Your verification OTP is: ${data.otp}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return new Response(JSON.stringify({ message: 'Invitation sent successfully' }), { status: 201 });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Error sending email' }), { status: 500 });
  }
}