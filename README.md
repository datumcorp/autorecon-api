# Automated & Collaborative Reconciliation System (ACRS)

*Introducing ACRS*
ACRS (pronounced as acres) is an Automated & Collaborative Reconciliation System designed to make life easier

Suitable for any companies (especially insurance brokers) that have plenty of transactions to reconcile with their banks or creditors (insurers)

>[Automated & Collaborative Reconciliation System](https://www.datumcorp.com/automated-collaborative-reconciliation-system/)

## Autorecon API

Autorecon API is a platform to quickly upload transactional data to ACRS awaiting reconciliation.

## Get Token

[GET] /token/:profilename

* Retrieve a token specific to the profile.
* When calling `[POST] /process`, the token must be included for authorization.
* User needed to be logged in to retrieve the token.


## FTP file to process

### file format
* Support multiple formats 
* Supported formats:
    - json -> *.json
    - csv (comma separated volume) -> *.csv
    - excel -> *.xls, *.xlsx
    - xml -> *.xml
### data format

* json:
    - all dates are in ISO8601 standard e.g. 2013-02-04T22:44:30.652Z
    - json schema:
```json
{
    "type": "object",
    "properties":{
        "Doc_Date": {
            "type": "string",
            "required": true,
            "importAs": "date",
            "format": "MM/DD/YYYY",
            "map": "date1" 
        },
        "Doc_Ref": {
            "type": "string",
            "required": true,
            "importAs": "string",
            "map": "text1" 
        },
        "PYM_RCP_No": {
            "type": "string",
            "required": true,
            "importAs": "string",
            "map": "text2" 
        },
        "Insurer": {
            "type": "string",
            "required": true,
            "importAs": "string",
            "map": "text3" 
        },
        "Cover_No": {
            "type": "string",
            "required": true,
            "importAs": "string",
            "map": "text4" 
        },
        "Policy_No": {
            "type": "string",
            "required": true,
            "importAs": "string",
            "map": "text5" 
        },
        "Ref_No": {
            "type": "string",
            "required": true,
            "importAs": "string",
            "map": "text6" 
        },
        "Producer": {
            "type": "string",
            "required": true,
            "importAs": "string",
            "map": "text7" 
        },
        "Inception_Date": {
            "type": "string",
            "required": true,
            "importAs": "date",
            "format": "MM/DD/YYYY",
            "map": "date2" 
        },
        "Client": {
            "type": "string",
            "required": true,
            "importAs": "string",
            "map": "text8" 
        },
        "Gross_Prm": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num1" 
        },
        "Gross_Brkg": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num2" 
        },
        "Brkg_GST": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num3" 
        },
        "Discount": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num4" 
        },
        "Stamp_Duty": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num5" 
        },
        "Bank": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num6" 
        },
        "Others": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num7" 
        },
        "Nett_Prm": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num8" 
        },
        "STax": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num9" 
        },
        "Amount": {
            "type": "number",
            "required": true,
            "importAs": "number",
            "format": "0.00",
            "map": "num10" 
        }

    }
}
```

    - sample json:
```json
[
    {
      "Doc_Date": "08/01/2016",
      "Doc_Ref": "33ME45",
      "PYM_RCP_No": "AAA123",
      "Insurer": "DET",
      "Cover_No": "BBB123",
      "Policy_No": "G1035219",
      "Ref_No": "REF0123",
      "Producer": "P17",
      "Inception_Date": "08/01/2016",
      "Client": "SAMPLE SDN BHD",
      "Gross_Prm": "14394",
      "Gross_Brkg": "1439.4",
      "Brkg_GST": "86.36",
      "Discount": "0",
      "Stamp_Duty": "10",
      "Bank": "0",
      "Others": "0",
      "Nett_Prm": "12878.24",
      "STax": "863.64",
      "Amount": "234.88"
    }
]
```

* csv & excel

```csv
Doc_Date,Doc_Ref,PYM_RCP_No,Insurer,Cover_No,Policy_No,Ref_No,Producer,Inception_Date,Client,Gross_Prm,Gross_Brkg,Brkg_GST,Discount,Stamp_Duty,Bank,Others,Nett_Prm,STax,Amount
08/01/2016,33ME45,AAA123,DET,BBB123,G1035219,REF0123,P17,08/01/2016,SAMPLE SDN BHD,14394,1439.4,86.36,0,10,0,0,12878.24,863.64,234.88
...
```

* xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<data>
    <row>
        <Doc_Date>08/01/2016</Doc_Date>
        <Doc_Ref>33ME45</Doc_Ref>
        <PYM_RCP_No>AAA123</PYM_RCP_No>
        <Insurer>DET</Insurer>
        <Cover_No>BBB123</Cover_No>
        <Policy_No>G1035219</Policy_No>
        <Ref_No>REF0123</Ref_No>
        <Producer>P17</Producer>
        <Inception_Date>08/01/2016</Inception_Date>
        <Client>SAMPLE SDN BHD</Client>
        <Gross_Prm>14394</Gross_Prm>
        <Gross_Brkg>1439.4</Gross_Brkg>
        <Brkg_GST>86.36</Brkg_GST>
        <Discount>0</Discount>
        <Stamp_Duty>10</Stamp_Duty>
        <Bank>0</Bank>
        <Others>0</Others>
        <Nett_Prm>12878.24</Nett_Prm>
        <STax>863.64</STax>
        <Amount>234.88</Amount>
    </row>
    <row>
        <Doc_Date>08/01/2016</Doc_Date>
        <Doc_Ref>33ME45</Doc_Ref>
        <PYM_RCP_No>AAA123</PYM_RCP_No>
        <Insurer>DET</Insurer>
        <Cover_No>BBB123</Cover_No>
        <Policy_No>G1035219</Policy_No>
        <Ref_No>REF0123</Ref_No>
        <Producer>P17</Producer>
        <Inception_Date>08/01/2016</Inception_Date>
        <Client>SAMPLE SDN BHD</Client>
        <Gross_Prm>14394</Gross_Prm>
        <Gross_Brkg>1439.4</Gross_Brkg>
        <Brkg_GST>86.36</Brkg_GST>
        <Discount>0</Discount>
        <Stamp_Duty>10</Stamp_Duty>
        <Bank>0</Bank>
        <Others>0</Others>
        <Nett_Prm>12878.24</Nett_Prm>
        <STax>863.64</STax>
        <Amount>234.88</Amount>
    </row>
</data>
```

## Process file

[POST] /process/:token?profile={profile}&refid={refid}

* params:
    - :token => security token. Need to request first while logged in into the system
* Query string:
    - profile => profile name to use
    - refid => (optional) If refid is provided, then the imported data will be appended to the to the same existing refid
* Verify token is valid for security purposes
* Will pickup the provided filename to process
* The data will be imported to db



