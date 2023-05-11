{{/*
Example for lookup function
*/}}
{{- define "gen.secret" -}}
{{- $secret := lookup "v1" "Secret" .Release.Namespace "secrets" -}}
{{- if $secret -}}
{{/*
   Reusing existing secret data
*/}}
appKey: {{ $secret.data.appKey }}
internalKeys: {{ $secret.data.internalKeys }}
{{- else -}}
{{/*
    Generate new data
*/}}
appKey: {{ randAlphaNum 10 | b64enc }}
internalKeys: {{ randAlphaNum 10 | b64enc }},{{ randAlphaNum 10 | b64enc }}
{{- end -}}
{{- end -}}