## The database

These are the base entries (no variations) of the database:

{% _.forEach(langDB, function(lang) { %}
### {%= lang.name %}
{%= literal(lang) %}
{% }) %}
