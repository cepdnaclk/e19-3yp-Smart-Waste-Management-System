#include <pgmspace.h>
 
#define SECRET
#define THINGNAME "3YP-ESP"                         //change this
 
const char WIFI_SSID[] = "Eng-Student";               //change this
const char WIFI_PASSWORD[] = "3nG5tuDt";           //change this
const char AWS_IOT_ENDPOINT[] = "a1vv3453z3am5v-ats.iot.eu-north-1.amazonaws.com";       //change this
 
// Amazon Root CA 1
static const char AWS_CERT_CA[] PROGMEM = R"EOF(
-----BEGIN CERTIFICATE-----
MIIDQTCCAimgAwIBAgITBmyfz5m/jAo54vB4ikPmljZbyjANBgkqhkiG9w0BAQsF
ADA5MQswCQYDVQQGEwJVUzEPMA0GA1UEChMGQW1hem9uMRkwFwYDVQQDExBBbWF6
b24gUm9vdCBDQSAxMB4XDTE1MDUyNjAwMDAwMFoXDTM4MDExNzAwMDAwMFowOTEL
MAkGA1UEBhMCVVMxDzANBgNVBAoTBkFtYXpvbjEZMBcGA1UEAxMQQW1hem9uIFJv
b3QgQ0EgMTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBALJ4gHHKeNXj
ca9HgFB0fW7Y14h29Jlo91ghYPl0hAEvrAIthtOgQ3pOsqTQNroBvo3bSMgHFzZM
9O6II8c+6zf1tRn4SWiw3te5djgdYZ6k/oI2peVKVuRF4fn9tBb6dNqcmzU5L/qw
IFAGbHrQgLKm+a/sRxmPUDgH3KKHOVj4utWp+UhnMJbulHheb4mjUcAwhmahRWa6
VOujw5H5SNz/0egwLX0tdHA114gk957EWW67c4cX8jJGKLhD+rcdqsq08p8kDi1L
93FcXmn/6pUCyziKrlA4b9v7LWIbxcceVOF34GfID5yHI9Y/QCB/IIDEgEw+OyQm
jgSubJrIqg0CAwEAAaNCMEAwDwYDVR0TAQH/BAUwAwEB/zAOBgNVHQ8BAf8EBAMC
AYYwHQYDVR0OBBYEFIQYzIU07LwMlJQuCFmcx7IQTgoIMA0GCSqGSIb3DQEBCwUA
A4IBAQCY8jdaQZChGsV2USggNiMOruYou6r4lK5IpDB/G/wkjUu0yKGX9rbxenDI
U5PMCCjjmCXPI6T53iHTfIUJrU6adTrCC2qJeHZERxhlbI1Bjjt/msv0tadQ1wUs
N+gDS63pYaACbvXy8MWy7Vu33PqUXHeeE6V/Uq2V8viTO96LXFvKWlJbYK8U90vv
o/ufQJVtMVT8QtPHRh8jrdkPSHCa2XV4cdFyQzR1bldZwgJcJmApzyMZFo6IQ6XU
5MsI+yMRQ+hDKXJioaldXgjUkK642M4UwtBV8ob2xJNDd2ZhwLnoQdeXeGADbkpy
rqXRfboQnoZsG4q5WTP468SQvvG5
-----END CERTIFICATE-----
)EOF";
 
// Device Certificate                                               //change this
static const char AWS_CERT_CRT[] PROGMEM = R"KEY(
-----BEGIN CERTIFICATE-----
MIIDWjCCAkKgAwIBAgIVALio+292qSaxD4DfWK2hrDVGCAtVMA0GCSqGSIb3DQEB
CwUAME0xSzBJBgNVBAsMQkFtYXpvbiBXZWIgU2VydmljZXMgTz1BbWF6b24uY29t
IEluYy4gTD1TZWF0dGxlIFNUPVdhc2hpbmd0b24gQz1VUzAeFw0yNDAxMDYyMDI3
MTdaFw00OTEyMzEyMzU5NTlaMB4xHDAaBgNVBAMME0FXUyBJb1QgQ2VydGlmaWNh
dGUwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCxOYF7rjkPd3jSGw20
EgpYrdY32Y36THmCwHEuAG2F10eXCCdi0Wy+f43iLMtIKVMjmmU6Xhw86kgcBOey
e4oZIeXkbZNusFTLufYUaK4a5MvClbkMMdjriejYFnfXsRqkfuAPgV+8OAWIxzgu
gdnALdBM3ky4xC2reqqwP/ulfUSY74oQ/5oXXSKzPdkqDpzrO9Zogcu9YX8StWLb
tUusf+74qd8F9En79g8NJToJWmieeld48vUGi+oxGvnLhvDlEc7m/fQO29dXhNAB
INLH9I1GIreGgp6+20ylqrmPmO+hGStkbI0+shIrw8pyid6/m7ZcCCMe33nKnS2n
qaPtAgMBAAGjYDBeMB8GA1UdIwQYMBaAFEWB124FMqCe73CYjE1rMWPsnkZHMB0G
A1UdDgQWBBR2fJtECsOxx7IlbFMGhdZGrPagezAMBgNVHRMBAf8EAjAAMA4GA1Ud
DwEB/wQEAwIHgDANBgkqhkiG9w0BAQsFAAOCAQEAcc8huF2URwKjTT7c2oaBTRGI
nb5Ujuw2I6FbIbjZ1En/wfuGfF/bP29LIl6VN85JwgxzM5O1ysHdzA6aImCQkrWN
eniVQ6iYk3fq6IzZhYUhpWzfAWjhXdGcvXEc3WsIYd9unM6Unr77qbT2WUJ4c51u
uFDfU3BmitG9BJZ2EYByudU2PgaK623KcgldK+Rsi8gTFVmphawURnm8ccmFFTNq
L9CRJ0TumskoAKFld2JiJh+wJNM4H+yjJQXcBtZDVZMeDNmAHeI/f/qgVekDqwck
5le0ZF5riqH66yGwSMfbkXdq2SeKB15NhorAso7mPqakj5bSaEC4MaJbfW/jgg==
-----END CERTIFICATE-----
 
 
)KEY";
 
// Device Private Key                                               //change this
static const char AWS_CERT_PRIVATE[] PROGMEM = R"KEY(
-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEAsTmBe645D3d40hsNtBIKWK3WN9mN+kx5gsBxLgBthddHlwgn
YtFsvn+N4izLSClTI5plOl4cPOpIHATnsnuKGSHl5G2TbrBUy7n2FGiuGuTLwpW5
DDHY64no2BZ317EapH7gD4FfvDgFiMc4LoHZwC3QTN5MuMQtq3qqsD/7pX1EmO+K
EP+aF10isz3ZKg6c6zvWaIHLvWF/ErVi27VLrH/u+KnfBfRJ+/YPDSU6CVponnpX
ePL1BovqMRr5y4bw5RHO5v30DtvXV4TQASDSx/SNRiK3hoKevttMpaq5j5jvoRkr
ZGyNPrISK8PKconev5u2XAgjHt95yp0tp6mj7QIDAQABAoIBAAY+dW5rG/2Mgwg8
BcaTYCPxs/txwcvQx/MwXox1XWZ6yD3s/p4/rKolilUuqNbZBeHaPbjJugr3YiUC
kzs5mQr7o8LhjXE36zTmT2I2sfOmnfs0FTn1w6PAzyBV4lEKH1suUSyarUnPW3qP
Mk6JKqfXtWAP8PoNh2JkRwFAr9gLu81sa7SwNpWzHXnHmvvcP3JpQgMpUvFcgELC
0+peqLS2VVfVDSB1s/RFOyok7Z46upUaJkIgtZQHgwp1xQVgQWjB4H7LhXwjrzuw
gKsQEKKAF8fitSZIBmusSfv1XCm0RmWU6MTuFMhDH6FgLcpwZA05qtDdV3q6L1pK
A2iPGs0CgYEA10e0F5CFKfoRM0BqRvGZVn6JlWlzTRds90Muh3bcmgeGfCEer4wM
yqev7W7Y4p9Oa1XvAAnTQBi+CUZs/PmX31R4SN6l5gYVKkh3UIGOn10+1eaOROJO
7Sc5EerGNG1cHxSFt/y3fAxGykFdACDWivGlpGpivPlHw3J3SgoeKnMCgYEA0r8U
hHNnj0dZjY/BMWEC0ppL+/0GDpfTT65d3ut9jMtUzL1Vo7kCK9i+YKl8X+8Nj/va
BQbMXV7FcdPcf/a2U6Rp7p6uuXpJ58dZSzczxdBohO3+jAgwEWr8LvNJntk8eIip
XT+zGnjVEDQKaq4leDZusVEWj0Wr4cDE6TTTgB8CgYBZ2Ps4uoBZPJzhHwk8AqlU
iAsz6IbOrfA0Yj2RG/KF9o4SUGBWM8VC7yllltW9/27jLUJKac9Y+PqXNGVYT3Mr
Kj3pa8MhdXhv5T6mwuubZ3dKHqdR6IG4SJ5w8+M1Dk9cSVxlpXuOsjD5SL5fx1TD
OIdBT4VWCVQCJkvTAtYEMQKBgE2kilmV7vRxlAO8j6+yjwiqQg5PlPixZO+5TOpB
FltV2iMoKjIMikk/LDyOlLz/ZJ7EaflqHMbVkKa0KEuYyGmebEy2d6br7+iNoE8+
wjtB4g//YsWSiqsQIGLnzRrR7B54MvWg70p0dALpOWE+UZ2taDC5sDcOsxmUHLfS
d41/AoGAZe35wyJXjtsayBj/3/gwfK+FqLffxi0M2oGkXcHci9k/xsVOgpV4zYE1
ZN9x/noc0AmAFWMrcaNgD9hFpb/XzC7KjUfoXvhGCLU2gv4aL+pwpvUpRhMtYkpz
9PwfrCCeQsmQBxtdaHuoG0hNmB3O1B+O1h2vXXjn0O8fe9Z3Hpc=
-----END RSA PRIVATE KEY-----
 
 
)KEY";