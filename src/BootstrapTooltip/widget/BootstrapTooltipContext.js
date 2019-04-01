define([
    "dojo/_base/declare",
    "dojo/_base/lang",
    "BootstrapTooltip/widget/BootstrapTooltip"
], function (declare, lang, _bootstrapTooltipWidget) {
    "use strict";

    return declare("BootstrapTooltip.widget.BootstrapTooltipContext", [_bootstrapTooltipWidget], {

        update: function (obj, callback) {
            logger.debug(this.id + ".update");
            this._contextObj = obj;

            var guid = obj ? obj.getGuid() : null;
            if (this.tooltipSource === "microflow") {
                if (this.tooltipMessageMicroflow !== "") {
                    if (!this.tooltipMessageMicroflowLazy) {
                        this._execMf(this.tooltipMessageMicroflow, obj ? obj.getGuid() : null, lang.hitch(this, function (string) {
                            this._tooltipText = string;
                            this._initializeTooltip(callback);
                        }));
                    } else {
                        this._tooltipText = '...';
                        this._initializeTooltip(callback);
                    }
                } else {
                    if (this.tooltipMessageString !== "") {
                        this._tooltipText = this.tooltipMessageString;
                    }
                    this._initializeTooltip();
                }
            } else if (this.tooltipSource === "attribute") {
                if (this.tooltipMessageAttribute !== "") {

                    if (obj.isEnum(this.tooltipMessageAttribute)) {
                        this._tooltipText = obj.getEnumCaption(this.tooltipMessageAttribute);
                    } else {
                        this._tooltipText = obj.get(this.tooltipMessageAttribute);
                    }

                    if (this._tooltipText == null || this._tooltipText === "") {
                        this._tooltipText = this.tooltipMessageString;
                    }

                    this._initializeTooltip();
                } else {
                    if (this.tooltipMessageString !== "") {
                        this._tooltipText = this.tooltipMessageString;
                    }
                    this._initializeTooltip();
                }
            }


            callback();
        }
    });
});

require(["BootstrapTooltip/widget/BootstrapTooltipContext"]);